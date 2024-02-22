from typing import Optional
import re
import os
import requests

import functions_framework

from db_queries import get_feedback_data
from gh_auth import get_installation_token

import logging

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

def _make_content (location: str, selected_html: str) -> str:
    return f'Location in document: {location}\n\nSelected HTML: {selected_html}'

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

    issue_id = payload['issue']['id']
    internal_id = _get_internal_id(payload['issue']['body'])
    installation_id = payload['installation']['id']

    if internal_id:
        feedback_data = get_feedback_data(internal_id)

        if feedback_data and installation_id:
            print(feedback_data)
            _make_response (issue_id, _make_content(*feedback_data), installation_id)
        else:
            print('no feedback_data')

    return '', 200
