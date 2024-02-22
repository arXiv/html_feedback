from typing import Tuple, Optional
import os

from sqlalchemy import create_engine
from sqlalchemy.sql import text

connection_string = os.environ['LATEXML_DB_URI']

engine = create_engine(connection_string)

def get_feedback_data (uuid: str) -> Optional[Tuple[str, str]]:
    with engine.connect() as conn:
        query = text("select location_low, selected_html from feedback where id = :uuid") \
            .bindparams(uuid=uuid)
        return conn.execute(query).first()
