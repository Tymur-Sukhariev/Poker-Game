🃏 Texas Hold'em Poker Web App

This is a full-stack Texas Hold'em Poker game built with Next.js, Tailwind CSS, and FastAPI. It supports six players, realistic turn-based betting, full hand history logging, and an interactive UI inspired by real gameplay dynamics.
📍 Initial Setup – Stack Selection
<img width="2048" alt="Screenshot 2025-07-09 at 15 08 21" src="https://github.com/user-attachments/assets/a8cb91ad-0f0c-437f-b09d-1922a806ee4a" />


Players begin by selecting their initial stack size. Once applied, a new hand can be started with one click.
🔁 Game Start – Preflop Phase
<img width="2047" alt="Screenshot 2025-07-09 at 15 09 13" src="https://github.com/user-attachments/assets/770301f8-ec3c-436e-9805-db46811e09a5" />



Cards are dealt, positions are assigned, and blinds are posted. The action panel updates dynamically for the current player with all valid poker actions.
🔥 Live Gameplay – Multi-Street Betting
<img width="2048" alt="Screenshot 2025-07-09 at 15 08 58" src="https://github.com/user-attachments/assets/f3d9bc32-965c-4c74-adf6-633d8c650592" />



From preflop to river, every action is logged in real-time. Raise and bet amounts are adjustable. Players interact through a clean and responsive UI.
📊 Hand History Log
<img width="2048" alt="Screenshot 2025-07-09 at 15 10 35" src="https://github.com/user-attachments/assets/ab20df41-2672-4a8f-ab6d-913de82c83d6" />


After every hand, detailed logs are stored and displayed on the right. They include player positions, dealt hands, actions in PokerKit-compatible format, and final winnings.
🔄 Game Reset
<img width="2048" alt="Screenshot 2025-07-09 at 15 11 01" src="https://github.com/user-attachments/assets/279d3d41-b85f-495b-8ec7-d19fb3867d3d" />


Players can reset the game and adjust stack sizes anytime for a fresh round of play.
⚙️ Tech Stack

    Frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui

    Backend: FastAPI, PostgreSQL, PokerKit

    Architecture: RESTful API, Dockerized backend, hand persistence with raw SQL
