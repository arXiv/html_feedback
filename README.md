## Version Description

This branch "Github_Issue_NoScreenShot" has only the Github Issue Report Function, and the screenshot and file attachment function have been removed. 

## Run the code

#### Build virtual env and activate env(optional):
```shell
python3 -m venv venv
```

```shell
source venv/bin/activate
```

#### Install requirements

``` shell
pip3 install -r requirements.txt
```

If pip3 does not work, try pip.

#### Start Flask Server

```shell
flask --app app run debug
```

or (Some env may use python)

```shell
python3 app.py
```

The website will defualt running on http://127.0.0.1:8080

## Features

1. Click the right bottom button to open report box.
2. Use shortcut to open the report box. (It will override the shortcut to prevent default browser shortcut behavior)
   - [Command or Meta(Windows)] + [ "[" or "{" ] to open report box.
   - [Command or Meta(Windows)] + [ "]" or "}" ] to close report box.
3. Selecting the text(html elements) to automatically show up small report button. Click small report button to open report box, we will capture the selected html and dom position of the selected elements.
4. In Report box, there is a description box. After click submit button, we will create a new tab to GitHub Issue. All the infomation will be auto filled, and also we will send data back to database as well.
5. Report Data
   - Article_url: url for Ar5iv article
   - User_info: Now we set default to some value.Designed to contain the user_id and the contact info.eg. account:yc2455 contact:@cornell.edu  
   - report time: time that the report generated. eg. Thu Apr 27 2023 23:29:13 GMT-0400 (Eastern Daylight Time)
   - Browser_info: the user's browser info, e.g. Chrome/112.0.0.0,Chrome,112.0.0.0
   - Description: The description that users write in the Report Box. 
   - Conversion_report: The link to Log(from pdf to html), easier for developer to solve the issue
   - source_file: the orginal article url
   - Selected html: use selected function to capture the html of selected text.
   - Location_low: the selected element identifier, like S2.T1.4.4.3
   - Location_high: the general element range, like T1
6. ScreenReader

## CSS and HTML

In index.html, these files were added:
1. `<script src="{{ url_for('static', filename='js/app.js') }}"></script>`
   - This script is sourced from the app.js file located in the js directory within the project's static folder. It is a JavaScript file that contains code specific to the features related to the error report.
2. `<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.3/html2canvas.min.js"></script>`
   - This script is sourced from an external URL provided by the CDN (Content Delivery Network) hosted on cdnjs.cloudflare.com. It is the minified version (1.3.3) of the HTML2Canvas library, which is a JavaScript library that allows capturing screenshots or rendering HTML elements into canvas.
3. `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">`
   - This link references an external CSS file hosted on cdn.jsdelivr.net. It is the minified version (5.3.0) of the Bootstrap CSS framework which provides pre-designed styles and components to help with responsive web development. We used Bootstrap for many components.
4. `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>`
   - This script includes the necessary JavaScript plugins required by Bootstrap components to function properly.
5. `<link rel="stylesheet" href="{{ url_for('static', filename='css/ar5iv.0.7.6.min.css') }}" />`
   - This link references a CSS file named ar5iv.0.7.6.min.css located in the css directory within the project's static folder. It is a CSS file that arXiv has been using before. We used it to follow the design style of arXiv.
6. `<link rel="stylesheet" href="{{ url_for('static', filename='css/ar5iv-site.0.2.1.css') }}" />`
   - This link references a CSS file named ar5iv-site.0.2.1.css located in the css directory within the project's static folder. It is a CSS file that arXiv has been using before. We used it to follow the design style of arXiv.
7. `<link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}" />`
   - This link references a CSS file named styles.css located in the css directory within the project's static folder. It is likely a CSS file that contains additional styles specific to the project or application that we have written.
