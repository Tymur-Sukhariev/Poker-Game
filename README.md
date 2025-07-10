# 🃏 Texas Hold'em Poker App

A full-stack multiplayer poker game built with **TypeScript, React, Next.js, Tailwind CSS, FastAPI, and PokerKit**.  
This app allows up to 6 players to play Texas Hold'em with real-time betting, stack management, and complete hand history logging.

---

## ✨ Features

### 🧮 Stack Setup & Game Start  
- **Custom Stack Input**: Players enter their initial chip stack.  
- **Apply Stack**: Confirmation toast appears once the stack is applied.  
- **Start Button**: Launches the game once stacks are set.
<img width="2048" alt="Screenshot 2025-07-09 at 15 08 21" src="https://github.com/user-attachments/assets/be901990-c344-49a3-8db0-ee577f2558a6" />
<img width="2048" alt="Screenshot 2025-07-09 at 15 08 58" src="https://github.com/user-attachments/assets/1040533f-3148-4b36-81c7-4f3a514347a7" />



---

### 🃏 Dealing & Preflop Setup  
- **Cards Dealt**: All players receive their hole cards.  
- **Dealer & Blinds**: System assigns the dealer, small blind, and big blind.  
- **Action Panel**: Players can fold, check, call, bet, raise, or go all-in.

<img width="2047" alt="Screenshot 2025-07-09 at 15 09 13" src="https://github.com/user-attachments/assets/0f679e6d-95f5-4767-b276-e1a5fef520bd" />

---

### 🔁 Multi-Street Betting  
- **Live Action Log**: Every player decision is shown in the game log.  
- **Stage Transitions**: Automatically progresses through flop, turn, and river.  
- **Pot Tracker**: Displays the current pot size in real-time.

<img width="2048" alt="Screenshot 2025-07-09 at 15 10 35" src="https://github.com/user-attachments/assets/b75ad6b8-3912-467d-92b5-30b1cd7d5466" />


---

### 📜 Hand History  
- **Summary Log**: At the end of each hand, a full summary is stored.  
- **Detailed Metadata**: Includes player hands, positions, actions, and winnings.  
- **Replay-Ready Format**: Action history uses `PokerKit`-compatible syntax.

<img width="2048" alt="Screenshot 2025-07-09 at 15 11 01" src="https://github.com/user-attachments/assets/f3d2af2c-a4ac-467a-af50-d52974c522e1" />

---

### 🧹 Game Reset & Replay  
- **Clean Reset**: Start over with new stacks and reshuffled cards.  
- **Instant Reuse**: Multiple hands can be played in sequence for testing or fun.
<img width="2048" alt="Screenshot 2025-07-09 at 15 11 01" src="https://github.com/user-attachments/assets/137ca9a1-f34e-45b6-a0ea-3526b892a502" />

---

## 🛠️ Tech Stack  

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React, Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Backend     | FastAPI, PokerKit             |
| Database    | PostgreSQL (raw SQL)          |
| DevOps      | Docker, Docker Compose        |

---

## 🚀 Features In Progress

- 🧑‍💼 **Admin Tools**: View logs, control game state, and manage history.  
- 🧪 **Integration Tests**: End-to-end coverage for gameplay flow.  
- 🌐 **Deployment Ready**: Containerized backend and API-ready frontend.
