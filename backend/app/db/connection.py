import psycopg
from psycopg.rows import dict_row

def get_connection():
    return psycopg.connect(
        dbname="test_db",
        user="root",
        password="root",
        host="db",
        port="5432",
        row_factory=dict_row,  # ensures rows come as dictionaries
    )
