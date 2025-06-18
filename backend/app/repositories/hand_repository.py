import uuid
import psycopg2


def insert_hand(stack: str, hands: str, actions: str, winnings: str, positions: str):
    conn = psycopg2.connect(
        dbname="test_db", user="root", password="root", host="db", port="5432"
    )
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO hand_log (id, stack, hands, actions, winnings, positions)
                VALUES (%s, %s, %s, %s, %s, %s)
            """,
                (str(uuid.uuid4()), stack, hands, actions, winnings, positions),
            )
