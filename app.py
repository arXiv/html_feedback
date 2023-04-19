import os
import base64
from io import BytesIO
from flask import Flask, render_template, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///uploads.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String())
    filename = db.Column(db.String())
    data = db.Column(db.LargeBinary)


@app.route('/', methods=['GET', 'POST'])
def page():
    return render_template('output.html')

'''
@app.route('/form', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def form():
    if request.method == 'POST':
        description = request.form['description']
        base64_screenshot = request.form['screenshot-data']
        if not description or not base64_screenshot:
            return "Error: Missing description or screenshot data.", 400
        # Decode the base64 screenshot and convert it into a BytesIO object
        img_data = base64.b64decode(base64_screenshot.split(',')[1])
        img_io = BytesIO(img_data)

        # Generate a unique filename
        filename = f"screenshot_{len(Upload.query.all()) + 1}.png"
        
        new_file = Upload(description=description, filename=filename, data=img_io.read())
        db.session.add(new_file)
        db.session.commit()
        return render_template('success.html')
    return render_template('form.html')
'''

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)