import { ActionLogEntry, GameState, Player } from "@/types/types";
import InitialLog from "./InitialLog";
import { formatAction } from "@/functions/formatAction";


export default function LogPanel({gameState}:{gameState:GameState}) {
  return (
    <div className="flex-1 overflow-auto bg-white border rounded p-4 my-4">
      <InitialLog initialPlayers={gameState.players} />
      <ul className="mt-4">

        {gameState.actionLog.map((entry, i) => {
          const playerName = `Player ${entry.playerIndex + 1}`;
          const description = formatAction(entry, playerName);
          const isBoardCards =
            entry.action === "deal_flop" ||
            entry.action === "deal_turn" ||
            entry.action === "deal_river";

          return isBoardCards
            ? <b key={i} className="block">{description}</b>
            : <li key={i}>{description}</li>;
          })}

        {gameState.isGameOver&&<li>HAND FINISHED!</li>}

      </ul>
    </div>
  );
}
