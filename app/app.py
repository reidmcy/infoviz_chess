import flask
import flask_assets


import utils


import argparse
import os.path
import sys
import glob

app = flask.Flask('Chess')
assets = flask_assets.Environment(app)

css_bundle = flask_assets.Bundle(
                    'css/chess.css',
                    'css/chessboard-1.0.0.css'
                    )
js_bundle = flask_assets.Bundle(
                    'js/chess.js',
                    'js/tree.json',
                    'js/chessboard-1.0.0.js',
                    )
img_bundel = flask_assets.Bundle('img/chesspieces/')
data_bundel = flask_assets.Bundle('data/')
assets.register('js_all', js_bundle)
assets.register('css_all', css_bundle)
assets.register('img_all', img_bundel)
assets.register('data_all', data_bundel)

@app.route("/")
def home():
    return flask.render_template("chess.html")

@app.route("/board", methods = ['GET', 'POST'])
def board():
    if flask.request.method == 'GET':
        return '{g : 1}'
    data = flask.request.form
    return str(data)

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
