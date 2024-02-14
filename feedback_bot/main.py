import re
import os
import requests

import functions_framework

# TODO: What to do with failures?

GH_API_TOKEN = os.environ['GH_API_TOKEN']

INTERNAL_ID_RE = re.compile(r'Internal issue ID\s?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})')
UUID_RE = re.compile(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')

def _get_internal_id (issue_body: str) -> str:
    if (match := re.match(INTERNAL_ID_RE, issue_body)):
        return match.group(1)
    elif (match := re.match(UUID_RE, issue_body)):
        return match.group(0)
    raise Exception # ???

def _make_response_url (issue_id: int, content: str) -> str:
    request_str = f'https://api.github.com/repos/arXiv/html_feedback/issues/{issue_id}/comments'
    requests.post(request_str,
                  json={
                      "body": content
                  },
                  headers={
                      'Accept': 'application/vnd.github+json',
                      'Authorization': f'Bearer {GH_API_TOKEN}',
                      'X-GitHub-Api-Version': '2022-11-28'
                  })
    # TODO: Add logging

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

    issue_id = payload['issue']['id']
    internal_id = _get_internal_id(payload['issue']['body'])



    
