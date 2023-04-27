import os
import base64
from io import BytesIO
from flask import Flask, render_template, request, send_from_directory, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import datetime
import jsonify

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['REPORTS_FOLDER'] = 'static/reports'
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
    return render_template('index.html')

def generate_html_report(description, file, screenshot):
    # Create the HTML report
    #report = f'<p>Description: {description}</p>'

    if file:
        # Read the file data
        file_data = file.read()

        # Encode the file data as a base64 string
        file_data_base64 = base64.b64encode(file_data).decode('utf-8')

        # Include the image in the HTML report as a data URI
        #report += f'<p>File: <img src="data:image/png;base64,{file_data_base64}"></p>

    html_report = f'''
    <html>
      <head>
        <title>Bug Report</title>
      </head>
      <body>
        <h1>Bug Report</h1>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>File:</strong> </strong> {file.filename if file else ''}
        <div>
            <img src="data:image/png;base64,{file_data_base64 if file else ''}">
        </div>
        </p>
        <p>Screenshot: <img src="{screenshot if screenshot else ''}"></p>
      </body>
    </html>
    '''

    return html_report

@app.route('/generate_report', methods=['POST'])
def generate_report():
    # Get the form data
    description = request.form.get('description')
    file = request.files.get('file')
    screenshot = request.form.get('screenshot')
    # Generate the HTML report
    html_report = generate_html_report(description, file, screenshot)

    # Save the HTML report to a file
    filename = f'report_{datetime.datetime.now().strftime("%Y%m%d_%H%M%S")}.html'
    report_path = os.path.join(app.config['REPORTS_FOLDER'], filename)

    with open(report_path, 'w') as f:
        f.write(html_report)

    # Return the URL of the generated report
    #report_url = url_for('static', filename=f'reports/{filename}')
    #return jsonify({'report_url': report_url, 'html': html_report})

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