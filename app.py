import os
import base64
from io import BytesIO
from flask import Flask, render_template, request, send_from_directory, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import datetime
import jsonify

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///report.db'

db = SQLAlchemy(app)

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    article_url = db.Column(db.String(100))
    user_info = db.Column(db.String(100))
    report_time=db.Column(db.String(100))
    browser_info=db.Column(db.String(100))
    description = db.Column(db.String(1000))
    conversion_report=db.Column(db.String(100))
    source_file=db.Column(db.String(100))
    attachment = db.Column(db.LargeBinary)
    screenshotImage = db.Column(db.LargeBinary)
    selected_html = db.Column(db.String())
    location_low=db.Column(db.String(100))
    location_high=db.Column(db.String(100))

@app.route('/', methods=['GET', 'POST'])
def page():
    if request.method == 'POST':
        article_url = request.form['article_url']
        user_info = request.form['user_info']
        description = request.form['description']
        screenshotImage = request.form['screenshotImage']
        article_url=request.form['article_url']
        report_time=request.form['reportTime']
        browser_info=request.form['browserInfo']
        conversion_report=request.form['conversion_report']
        source_file=request.form['source_file']

        if 'url' in request.form:   
            url = request.form['url']
        else:
            url = None
            
        if 'attachment' in request.files:
            attachment = request.files['attachment'].read()
        else:
            attachment = None
            
        if 'location_low' in request.form:
            location_low = request.form['location_low']
        else:
            location_low=None
            
        if 'location_high' in request.form:
            location_high=request.form['location_high']
        else:
            location_high=None
            
        if screenshotImage:
            img_data = base64.b64decode(screenshotImage.split(',')[1])
            img_io = BytesIO(img_data)
            new_report = Report(article_url=article_url,user_info=user_info,description=description, attachment=attachment, screenshotImage=img_io.read(), selected_html=url,report_time=report_time,browser_info=browser_info,conversion_report=conversion_report,source_file=source_file, location_low=location_low, location_high=location_high)
        else:
            new_report = Report(article_url=article_url,user_info=user_info,description=description, attachment=attachment, selected_html=url,report_time=report_time,browser_info=browser_info,conversion_report=conversion_report,source_file=source_file, location_low=location_low, location_high=location_high)
        db.session.add(new_report)
        db.session.commit()
        return 'OK'
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

@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)