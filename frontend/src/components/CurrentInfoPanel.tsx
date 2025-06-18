import { GameState } from "@/types/types";

export default function CurrentInfoPanel({gameState}:{gameState:GameState}){
    const currPlayerIdx = gameState.currentPlayerIndex;
    const currentPlayer = `Player ${currPlayerIdx+1}`;
    const playerStack = gameState.players[currPlayerIdx].stack;
    return(
        !gameState.isGameOver&&
        <div className="pt-[10px] pb-6 text-center">
            <div className="flex justify-around">
                <b className="text-[18px]">Player's Stack: {playerStack}</b>
                <p className="text-[18px]">{currentPlayer} is acting...</p>
                <b className="text-[18px]">Pot:{gameState.pot}</b> <br />
            </div>
        </div>
    )
}