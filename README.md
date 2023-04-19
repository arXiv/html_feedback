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