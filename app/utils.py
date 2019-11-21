import chess
import chess.engine
import functools

engine_path = 'stockfish'
blunder_threshold = 200
limits = chess.engine.Limit(time=.1)
root_fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
engine_options = {'threads' : 10}

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
    for i, c in enumerate(children):
        if i == 0:
            c['primary'] = True
            c['blunder'] = False
            c['value'] = 1.0
        else:
            delta = top_score - c['score']
            c['primary'] = False
            c['blunder'] = delta > blunder_threshold
            c['value'] = 1 / (delta / 100 + 1)
    return children

@functools.lru_cache(maxsize = 1028)
def get_children(fen):
    engine = chess.engine.SimpleEngine.popen_uci(engine_path)
    board = chess.Board(fen = fen)
    children = gen_child_info(board, engine)
    engine.quit()

    parent_fen = board.fen()

    for i, c in enumerate(children):
        move = c['move']
        board.push_uci(move)
        c['name'] = move
        c['parent_fen'] =  parent_fen
        c['fen'] =  board.fen()
        c['num_moves'] =  len(list(board.legal_moves))
        c['children'] = []
        board.pop()
    c_ret = []
    for i, c in enumerate(children):
        if i % 2:
            c_ret.append(c)
        else:
            c_ret.insert(0, c)
    return c_ret

def get_root():

    return {
        'depth': 20,
        'seldepth': 1,
        'multipv': 1,
        'score': 0,
        'nodes': 1301973,
        'nps': 1299374,
        'tbhits': 0,
        'time': 1.002,
        'hashfull': 607,
        'move': 'root',
        'primary': True,
        'blunder': False,
        'value': 1.0,
        'name': 'root',
        'parent_fen': root_fen,
        'num_moves' : 20,
        'children': get_children(root_fen),
     }
