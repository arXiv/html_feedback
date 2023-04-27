import os
import base64
from io import BytesIO
from flask import Flask, render_template, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///report.db'

db = SQLAlchemy(app)

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String())
    attachment = db.Column(db.LargeBinary)
    screenshotImage = db.Column(db.LargeBinary)
    selected_html = db.Column(db.String())


@app.route('/', methods=['GET', 'POST'])
def page():
    if request.method == 'POST':
        description = request.form['description']
        screenshotImage = request.form['screenshotImage']
        if 'url' in request.form:   
            url = request.form['url']
        else:
            url = None
        if 'attachment' in request.files:
            attachment = request.files['attachment'].read()
        else:
            attachment = None
        if screenshotImage:
            img_data = base64.b64decode(screenshotImage.split(',')[1])
            img_io = BytesIO(img_data)
            new_report = Report(description=description, attachment=attachment, screenshotImage=img_io.read(), selected_html=url)
        else:
            new_report = Report(description=description, attachment=attachment, selected_html=url)
        db.session.add(new_report)
        db.session.commit()
        return 'OK'
    return render_template('index.html')

@app.route('/test', methods=['GET', 'POST'])
def test():
    return render_template('test.html')

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)