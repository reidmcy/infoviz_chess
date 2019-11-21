import chess
import chess.engine

engine_path = 'stockfish'
blunder_threshold = 200
limits = chess.engine.Limit(time=.5)

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

def get_children(fen):
    engine = chess.engine.SimpleEngine.popen_uci(engine_path)

    board = chess.Board(fen = fen)

    children = gen_child_info(board, engine)

    parent_name = 'Missing'
    parent_fen = board.fen()

    for i, c in enumerate(children):
        move = c['move']
        board.push_uci(move)
        c['name'] = move
        c['parent'] =  parent_name
        c['parent_fen'] =  parent_fen
        c['fen'] =  board.fen()
        c['children'] = []
        board.pop()

    return children
