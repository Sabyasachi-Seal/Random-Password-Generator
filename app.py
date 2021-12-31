from flask import Flask, request, render_template
import password

app = Flask("__name__")

q = ""

@app.route("/")
def loadPage():
	return render_template('index.html', query="")



@app.route("/", methods=['POST'])
def password_func():
    inputQuery1 = request.form['query1']

    generated = password.password_gen(inputQuery1)
    
    return render_template('index.html', output1=generated, query1 = request.form['query1'])

app.run()