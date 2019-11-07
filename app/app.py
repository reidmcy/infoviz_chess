import flask
import flask_assets

import os.path
import sys

app = flask.Flask('Chess')
assets = flask_assets.Environment(app)

css_bundle = flask_assets.Bundle('css/chess.css')
js_bundle = flask_assets.Bundle(
                    'js/chess.css',
                    'js/tree.json',
                    )

assets.register('js_all', js_bundle)
assets.register('css_all', css_bundle)

@app.route("/")
def home():
    return flask.render_template("chess.html")

@app.route('/favicon.ico')
def favicon():
    return flask.send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    if sys.platform == 'linux':
        app.run(host='0.0.0.0', debug=False, port=8801)
    else:
        app.run(debug=True)
