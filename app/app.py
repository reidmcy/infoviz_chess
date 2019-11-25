import flask
import flask_assets

import utils

import argparse
import os.path
import sys
import json

app = flask.Flask('Chess')
assets = flask_assets.Environment(app)

css_bundle = flask_assets.Bundle('css/')
js_bundle = flask_assets.Bundle('js/')
img_bundel = flask_assets.Bundle('img/chesspieces/')
data_bundel = flask_assets.Bundle('data/')
assets.register('js_all', js_bundle)
assets.register('css_all', css_bundle)
assets.register('img_all', img_bundel)
assets.register('data_all', data_bundel)


@app.route("/")
@app.route("/root")
@app.route("/root/<r1>/<r2>/<r3>/<r4>/<r5>/<r6>/<r7>/<r8>")
def root_fen(**fen_kwargs):
    if len(fen_kwargs) < 1:
        fen = utils.root_fen
    else:
        fen = utils.get_fen(fen_kwargs)
    return flask.render_template("chess.html", start_fen = fen)

@app.route("/board/<r1>/<r2>/<r3>/<r4>/<r5>/<r6>/<r7>/<r8>", methods = ['GET','POST'])
def get_children(**fen_kwargs):
    fen = utils.get_fen(fen_kwargs)
    return flask.Response(json.dumps(utils.get_children(fen)), mimetype='text/json')

@app.route("/start/<r1>/<r2>/<r3>/<r4>/<r5>/<r6>/<r7>/<r8>", methods = ['GET','POST'])
def start_fen(**fen_kwargs):
    fen = utils.get_fen(fen_kwargs)
    return flask.Response(json.dumps(utils.get_start(fen)), mimetype='text/json')

@app.route('/favicon.ico')
def favicon():
    return flask.send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start the server', formatter_class=argparse.ArgumentDefaultsHelpFormatter)

    parser.add_argument('--port', default = 8805, help='port to run on')
    args = parser.parse_args()

    if sys.platform == 'linux':
        app.run(host='0.0.0.0', debug=False, port=args.port)
    else:
        app.run(debug=True, port=args.port)
