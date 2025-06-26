import { ActionLogEntry, GameState } from "@/types/types";

type ToSend = {
    actions: ActionLogEntry[],
    stackForAll: number,
    holeCards: string[] // ex: ['Ks8d', '6dTs', '9CAh', 'JcTc', 'QsQd', 'JsJd'] -> hole cards of each player
}

export async function gamePost(gameState:GameState){

    let toSend:ToSend = {
        actions: gameState.actionLog,
        stackForAll: gameState.stackForAll,
        holeCards: []
    };
    const players = gameState.players;

    //Formated way of cards are shown, from ['Ks', '8d'] -> 'Ks8d'
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
    console.log("Response from API:", data.message);
  } catch (error) {
    console.error("Failed to post game data:", error);
  }

}