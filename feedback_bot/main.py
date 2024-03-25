from typing import Optional
import base64
from urllib.parse import unquote
import re
import requests

import functions_framework

from db_queries import get_feedback_data
from gh_auth import get_installation_token

# TODO: What to do with failures?

INTERNAL_ID_RE = re.compile(r'Internal issue ID\\n\\n([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})')
UUID_RE = re.compile(r'[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}')

def _get_internal_id (issue_body: str) -> Optional[str]:
    if (match := re.search(INTERNAL_ID_RE, issue_body)):
        return match.group(1)
    elif (match := re.search(UUID_RE, issue_body)):
        return match.group(0)
    return None

def _make_response (issue_id: int, content: str, installation_id: str) -> str:
    request_str = f'https://api.github.com/repos/arXiv/html_feedback/issues/{issue_id}/comments'
    installation_token = get_installation_token(installation_id)
    if installation_token:
        res = requests.post(request_str,
                    json={
                        "body": content
                    },
                    headers={
                        'Accept': 'application/vnd.github+json',
                        'Authorization': f'Bearer {installation_token}',
                        'X-GitHub-Api-Version': '2022-11-28'
                    })
        print(f'{res.status_code}: {res.text}')

def _data_url_to_html(data_url):
    """
    Converts a data URL to human-readable HTML or text.
    
    Parameters:
    - data_url (str): A data URL containing encoded HTML or text.
    
    Returns:
    - str: The decoded HTML or text.
    """
    # Split the data URL at the first comma to separate metadata from data
    metadata, encoded_data = data_url.split(',', 1)
    
    # Check if the data is Base64 encoded
    if ";base64" in metadata:
        # Decode the Base64 data
        raw_data = base64.b64decode(encoded_data)
    else:
        # URL-decode the data
        raw_data = unquote(encoded_data)
    
    # Convert bytes to string if necessary
    if isinstance(raw_data, bytes):
        raw_data = raw_data.decode('utf-8')
    
    return raw_data

def _make_content (location: str, selected_html: str) -> str:
    return f'Location in document: {location}\n\nSelected HTML: {_data_url_to_html(selected_html)}'

@functions_framework.http
def main(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    payload = request.get_json(silent=True)

    print(payload)

    if payload.get('action') != 'opened':
        return '', 200

    issue_number = payload['issue']['number']
    internal_id = _get_internal_id(payload['issue']['body'])
    installation_id = payload['installation']['id']

    print (issue_number)
    print (internal_id)
    print (installation_id)

    if internal_id:
        feedback_data = get_feedback_data(internal_id)

        print (feedback_data)

        if feedback_data and installation_id:
            print(feedback_data)
            _make_response (issue_number, _make_content(*feedback_data), installation_id)
        else:
            print('no feedback_data')

    return '', 200
