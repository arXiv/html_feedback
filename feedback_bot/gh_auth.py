from typing import Optional
from jwt import JWT, jwk_from_pem
import time
import os
import requests
import logging

pem = os.environ['GH_APP_PEM']
app_id = os.environ['APP_ID']

def _get_jwt ():
    # Open PEM
    signing_key = jwk_from_pem(pem.encode('utf-8'))

    payload = {
        # Issued at time
        'iat': int(time.time()),
        # JWT expiration time (10 minutes maximum)
        'exp': int(time.time()) + 600,
        # GitHub App's identifier
        'iss': app_id
    }

    # Create JWT
    jwt_instance = JWT()
    return jwt_instance.encode(payload, signing_key, alg='RS256')

def get_installation_token (installation_id: str) -> Optional[str]:
    res = requests.post(f"https://api.github.com/app/installations/{installation_id}/access_tokens",
                        headers={
                            'Accept': 'application/vnd.github+json',
                            'Authorization': f'Bearer {_get_jwt()}',
                            'X-GitHub-Api-Version': '2022-11-28'
                        })
    if res.status_code == 201:
        return res.json()['token']
    else:
        logging.warning('Failed to retrieve installation token')
        return None