## Description

This is a flask demo for the ArXiv bug report function. The bug report initiation could be done in two ways(screenshot and highlight). The link to design document is https://www.figma.com/file/p13ZktQJEV8CXx3M7Z10fe/ArXiv-Error-report?node-id=0%3A1&t=gEav7Q8shh8D9Du0-1.

## Steps to run the project

### Create virtual environment (below are based on mac)

- if you want to use virtualenv:
  `python3 -m venv venv`
- activate env
  `source venv/bin/activate`

### Install Dependencies

`pip install Flask, requests, Flask-SQLAlchemy, flask-cors`

### Create database

run a python interactive shell

- `from app import db`
- `db.create_all()`
- `exit()`

### Start Server
Start the server by `python app.py` or `flask --app app run`

## Details about the features(not finished)
1. Highlight
2. Screenshot

## Future work plan
1. Add the feature of shortcut initiation for the convenience of screenreader users
2. Show the demo to our users and optimize the user experience based on their feedback
3. Fix the bug of the existing project.


## Develop Log 4/19
#### Issues Found

1. The bug button keeps floating.
2. Need to highlight selected text and make it visible during screenshot.
3. Avoid taking screenshots of all areas.
4. Research indicates that a complete update may be necessary.
5. Issues with screenshot functionality: Firstly, some characters cannot be captured (likely due to HTML2Canvas limitations), and secondly, in split-screen mode, the screenshot position shifts downwards.
#### Completed Work(For Whole Group)

1. **BIG Update** to the components, we have now implemented Bootstrap. The report box now has a brand new look. We have reorganized and refactored the JS files, including removing unnecessary code. The report box now has a streamlined appearance that can be easily tested, and we will continue to build upon this framework for future code updates.
2. Investigating fast screenshot plugins or features. Puppeteer? dom-to-image? HTMLcanvas2 is in experimental stage, Puppeteer only provides help for some browsers, and dom-to-image doesn't work. Further research is needed. https://github.com/niklasvh/html2canvas
3. The previous Report box would retain the previous screenshot, but with this update, the screenshot is removed every time the report box is closed.
4. Adding a functionality to download the screenshot locally, hoping to further confirm if the screenshot is complete and clear.
5. The unclear screenshot issue is caused by changing the scale. After designing the new report box, the scale was changed back to the old one, making it clear again. I also found that some fonts cannot be captured, which is likely due to them being re-rendered later. Tried using rasterizeHTML, but it was not successful.![](assets/image-20230420001656731.png)

![image-20230420001808605](assets/image-20230420001808605.png)

6. We made the screenshot in the form clickable. By clicking on the screenshot, it will be enlarged so that users can see the details on it.
7. The screenshot could not show the exact contents that are highlighted by the users before. After modifying, the selected texts stay highlighted in the screenshot.
