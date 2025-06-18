import { ActionLogEntry, GameState } from "@/types/types";

type ToSend = {
    actions: ActionLogEntry[],
    stackForAll: number,
    holeCards: string[]
}

export async function gamePost(gameState:GameState){

    let toSend:ToSend = {
        actions: gameState.actionLog,
        stackForAll: gameState.stackForAll,
        holeCards: []
    };
    const players = gameState.players;

    for(let i = 0; i < players.length; i++){
      toSend.holeCards.push(players[i].holeCards.join(''))
    }

  try {
    const response = await fetch("http://localhost:8000/hands/play", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response from API:", data);
  } catch (error) {
    console.error("Failed to post game data:", error);
  }

}