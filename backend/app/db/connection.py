import psycopg2
from psycopg.rows import dict_row

def get_connection():
    return psycopg2.connect(
        dbname="test_db",
        user="root",
        password="root",
        host="db",
        port="5432",
        row_factory=dict_row,
    )
