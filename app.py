from flask import Flask, render_template, request, jsonify
from parsing import shutter

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        searched = request.form.get("description")
        #print(searched)
        Cards, keywords = shutter(searched)
        return render_template("index_answer.html", searched=searched, Cards=Cards, keywords=keywords)
    else:
        return render_template("index_empty.html")

@app.route("/card_modal", methods=["GET", "POST"])
def ajaxfile():
    if request.method == "POST":
        cardrid = request.form['cardrid']
        description = request.form['description']
        keys = request.form['keys'].strip().replace("'", "").replace("]", "").replace("[", "")
        print(keys)
        url = request.form['url']
        preview = request.form['preview']
        return jsonify({'htmlresponse': render_template('response.html', cardrid=cardrid, description=description, keys=keys, url=url, preview=preview)})

@app.route("/modal_clipboard", methods=["GET", "POST"])
def ajaxfileclipboard():
    if request.method == "POST":
        keywords = request.form['keywords']
        return jsonify({'htmlresponse': render_template('responseclipboard.html', keywords=keywords)})

if __name__ == "__main__" :
    app.run(debug=True)