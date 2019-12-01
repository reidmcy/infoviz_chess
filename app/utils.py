import chess
import chess.engine

import random

import sys
import json
import functools
import os.path

if sys.platform == 'darwin':
    engine_path = 'stockfish/stockfish-10-64'
else:
    engine_path = 'stockfish'

cache_path = 'sf_cache.json'

cpLookup_simple = None
sf_cache = None

# How long the engine takes per query
limits = chess.engine.Limit(time=.5)

# Board to start at
root_fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

# number of threads stockfish can use
engine_options = {'threads' : 8}

# What we consider a blunder
blunder_threshold = 50

fenComps = 'rrqn2k1/8/pPp4p/2Pp1pp1/3Pp3/4P1P1/R2NB1PP/1Q4K1 w KQkq - 0 1'.split()

def cp_to_winrate(cp, lookup_file = os.path.join(os.path.dirname(__file__), 'cp_winrate_lookup_simple.json')):
    global cpLookup_simple
    try:
        cp = int(float(cp) / 10) / 10
    except OverflowError:
        return float("nan")
    if cpLookup_simple is None:
        with open(lookup_file) as f:
            cpLookup_str = json.load(f)
            cpLookup_simple = {float(k) : wr for k, wr in cpLookup_str.items()}
    try:
        return cpLookup_simple[cp]
    except KeyError:
        return None

def active_is_white(fen_str):
    return fen_str.split(' ')[1] == 'w'

def fen_complete(s):
    splitS = s.split()
    return ' '.join(splitS + fenComps[len(splitS):])

def get_fen(kwargs):
    fen_vals = []
    for i in range(8):
        fen_vals.append(kwargs[f"r{i + 1}"])
    return  fen_complete('/'.join(fen_vals))

def cpToInt(cpVal):
    if cpVal.is_mate():
        if cpVal.relative.mate() < 0:
            return -1000
        else:
            return 1000
    else:
        return int(cpVal.relative.cp)

def uci_to_dict(uci_dict):
    ret_dict = uci_dict.copy()
    ret_dict['move'] = str(ret_dict['pv'][0])
    del ret_dict['pv']
    ret_dict['score'] = cpToInt(ret_dict['score'])
    return ret_dict

def gen_child_info(board, engine, max_children = 20):
    results = engine.analyse(
                            board,
                            limit = limits,
                            info = chess.engine.INFO_ALL,
                            multipv = max_children,
                            options = engine_options,
        )
    children = sorted([uci_to_dict(r) for r in results], key = lambda x : x['score'], reverse=True)
    top_score = children[0]['score']

    l_pop = [0, 0] + list(range(min(len(children), 4)))
    m_pop_index = random.choice(l_pop)

    for i, c in enumerate(children):
        if i == 0:
            c['primary'] = True
            c['blunder'] = False
            c['value'] = 1.0
            c['trick_line'] = False
            c['trick_opp_line'] = random.random() > .75
            c['popular'] = i == m_pop_index
        else:
            delta = top_score - c['score']
            c['primary'] = False
            c['blunder'] = delta > blunder_threshold
            c['value'] = 1 / (delta / 100 + 1)
            c['trick_line'] = c['value'] > random.random()
            c['trick_opp_line'] = c['value'] * 1.2 < random.random()
            c['popular'] = i == m_pop_index
    return children

def engine_query(fen):
    engine = chess.engine.SimpleEngine.popen_uci(engine_path)
    board = chess.Board(fen = fen)
    children = gen_child_info(board, engine)
    engine.quit()

    parent_fen = board.fen()

    first_index = len(children) // 3
    second_index = len(children) // 3 * 2

    for i, c in enumerate(sorted(children, key = lambda x : x['score'], reverse = True)):
        move = c['move']
        c['name'] = board.san(board.parse_uci(move))
        board.push_uci(move)
        c['score_group'] = 0 if i < first_index else 1 if i < second_index else 2
        c['uci_move'] = move
        c['win_prob'] = cp_to_winrate(c['score'])
        c['parent_fen'] =  parent_fen
        c['fen'] =  board.fen()
        c['is_white'] = active_is_white(board.fen())
        c['abs_score'] = c['score'] if c['is_white'] else -1 * c['score']
        c['num_moves'] =  len(list(board.legal_moves))
        board.pop()
    c_ret = []
    for i, c in enumerate(children):
        if i % 2:
            c_ret.append(c)
        else:
            c_ret.insert(0, c)
    for i, c in enumerate(c_ret):
        c['sort_index'] = i
    return c_ret

@functools.lru_cache(maxsize = 1028)
def get_children(fen):
    global sf_cache
    try:
        return sf_cache[fen]
    except KeyError:
        sf_cache[fen] = engine_query(fen)
        with open(cache_path, 'a') as f:
            json.dump({
                        'fen' : fen,
                        'data' : sf_cache[fen],
                        }, f)
            f.write('\n')
        return sf_cache[fen]
    except TypeError:
        sf_cache = {}
        try:
            with open(cache_path, 'r') as f:
                for l in f:
                    l_json = json.loads(l)
                    sf_cache[l_json['fen']] = l_json['data']
        except FileNotFoundError:
            pass
        return get_children(fen)


def get_start(fen):
    board = chess.Board(fen)
    c = {
        'move': 'start',
        'primary': True,
        'blunder': False,
        'value': 1.0,
        'score' : 0.0,
        'win_prob' : .5,
        'abs_score' : 0.0,
        'name': 'root',
        'parent_fen': fen,
        'trick_line' : False,
        'trick_opp_line' : False,
        'popular' : False,
        'fen' : fen,
        'num_moves' : len(list(board.legal_moves)),
        'is_white' : active_is_white(board.fen()),
    }
    try:
        c['children'] = get_children(fen)
    except chess.engine.EngineTerminatedError:
        c['children'] = 0
        c['num_moves'] = 0,
    return c
