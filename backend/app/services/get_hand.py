import psycopg2


def fetch_hand_history():
    conn = psycopg2.connect(
        dbname="test_db", user="root", password="root", host="db", port="5432"
    )

    with conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, stack, hands, actions, winnings, positions FROM hand_log"
            )
            rows = cur.fetchall()
            columns = [desc[0] for desc in cur.description]
            return [dict(zip(columns, row)) for row in rows]
