import { GameState } from "@/types/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getNextStage } from "@/functions/getNextStage";
import { getFirstToAct } from "@/functions/getFirstToAct";
import { gamePost } from "@/api/gamePost";
import { advanceOrEndRound } from "@/functions/nextPlayerOrRound";

interface ActionPanelProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
  refreshHistory:any
}

export const MIN_BET_RAISE = 40;

export default function ActionPanel({ gameState, setGameState, refreshHistory }: ActionPanelProps) {

    const [posted, setPosted] = useState(false);   // prevents double-send

    const [betValue, setBetValue] = useState(MIN_BET_RAISE);
    const [raiseValue, setRaiseValue] = useState(MIN_BET_RAISE);

    // 1) SEND hand to db; 2) Refresh history.
    useEffect(() => {
      if (gameState.isGameOver && gameState.stage === "showdown" && !posted) {
        setPosted(true);                      // mark as sent for this hand
        (async () => {
          try {
            await gamePost(gameState);        // POST to /hands/play
            await refreshHistory();           // GET fresh history list
          } catch (err) {
            console.error("Failed to save hand:", err);
          }
        })();
      }
    }, [gameState.isGameOver, gameState.stage, posted, gameState, refreshHistory]);

    // Return flag to false, cuz hand was already saved to DB:
    useEffect(() => {
      if (!gameState.isGameOver && posted) setPosted(false); 
    }, [gameState.isGameOver, posted]);


    // Values to MIN, cuz NEW round began:
    useEffect(() => {
        setBetValue(MIN_BET_RAISE);
        setRaiseValue(MIN_BET_RAISE);
    }, [gameState.stage]);


    
    useEffect(() => {
      if (gameState) {
        console.log(
          "STATE COMMITTED:",
          JSON.parse(JSON.stringify(gameState))
        );
      }
    }, [gameState]);


function handleFold(playerIndex: number) {
  setGameState(current => {
    if (!current) return current;
    const cloned = {
      ...current,
      players: [...current.players],
      actionLog: [...current.actionLog],
    };

    const player = { ...cloned.players[playerIndex] };
    cloned.players[playerIndex] = player;

    player.isFolded = true;

    cloned.actionLog.push({
      playerIndex,
      action: "fold",
      round: cloned.stage as "preflop" | "flop" | "turn" | "river",
    });

    return advanceOrEndRound(cloned);
  });
}


function handleCheck(playerIndex: number) {
  setGameState(current => {
    if (!current) return current;

    const cloned = {
      ...current,
      actionLog: [...current.actionLog],
    };

    cloned.checkCount += 1;

    cloned.actionLog.push({
      playerIndex,
      action: "check",
      round: cloned.stage as "preflop" | "flop" | "turn" | "river",
    });

    const updated = advanceOrEndRound(cloned);
    return updated;
  });
}


function handleCall(playerIndex: number) {
  setGameState(current => {
    if (!current) return current;

    const cloned = {
      ...current,
      players: [...current.players],
      actionLog: [...current.actionLog]
    };

    const player = { ...cloned.players[playerIndex] };
    cloned.players[playerIndex] = player;

    const toCall = cloned.currentBet - player.currentBet;
    const amountContributed = Math.min(toCall, player.stack);

    player.currentBet += amountContributed;
    player.stack -= amountContributed;
    cloned.pot += amountContributed;


    cloned.actionLog.push({
      playerIndex,
      action: "call",               
      amount: amountContributed,
      round: cloned.stage as "preflop" | "flop" | "turn" | "river",
    });


    const updated = advanceOrEndRound(cloned);
    return updated;
  });
}

function handleBet(playerIndex: number) {
  setGameState(current => {
    if (!current) return current;

    const cloned = {
      ...current,
      players: [...current.players],
      actionLog: [...current.actionLog],
    };

    const player = { ...cloned.players[playerIndex] };
    cloned.players[playerIndex] = player;

    player.stack -= betValue;
    player.currentBet = betValue;

    cloned.pot += betValue;
    cloned.currentBet = betValue;

    cloned.lastRaise=betValue;

    cloned.actionLog.push({
      playerIndex,
      action: "bet",
      amount: betValue,
      round: cloned.stage as "preflop" | "flop" | "turn" | "river",
    });

    return advanceOrEndRound(cloned);
  });
    setRaiseValue(betValue);
}


function handleRaise(playerIndex: number) {
  setGameState(current => {
    if (!current) return current;

    const cloned = {
      ...current,
      players: [...current.players],
      actionLog: [...current.actionLog],
    };

    const player = { ...cloned.players[playerIndex] };
    cloned.players[playerIndex] = player;

    const toCall = cloned.currentBet - player.currentBet;
    const minRaise = cloned.lastRaise;

    // Ensure desired raise is valid
    let effectiveRaise = Math.max(raiseValue, minRaise);

    // Compute total amount required to raise
    let totalContribution = toCall + effectiveRaise;

    // Cap to player's full stack (all-in)
    const maxContribution = player.stack;
    if (totalContribution > maxContribution) {
      totalContribution = maxContribution;
      effectiveRaise = Math.max(totalContribution - toCall, minRaise);
    }

    // Update game state
    player.stack -= totalContribution;
    player.currentBet += totalContribution;
    cloned.pot += totalContribution;
    cloned.currentBet = player.currentBet;
    cloned.lastRaise = effectiveRaise;

    cloned.actionLog.push({
      playerIndex,
      action: "raise",
      amount: player.currentBet,
      round: cloned.stage as "preflop" | "flop" | "turn" | "river",
    });

    return advanceOrEndRound(cloned);
  });
}



function handleAllIn(playerIndex: number) {
  setGameState(current => {
    if (!current) return current;

    const cloned = {
      ...current,
      players: [...current.players],
      actionLog: [...current.actionLog],
    };

    const player = { ...cloned.players[playerIndex] };
    cloned.players[playerIndex] = player;

    const toCall = cloned.currentBet - player.currentBet;   // chips needed to match
    const shove    = player.stack;                          // whole stack
    const raiseAmt = Math.max(shove - toCall, 0);           // part that’s a raise

    // move chips
    player.currentBet += shove;
    player.stack = 0;
    player.isAllIn = true;
    cloned.pot += shove;

    if (raiseAmt > 0) {
      // it IS a raise-all-in
      cloned.currentBet  = player.currentBet;
      cloned.lastRaise   = raiseAmt;

      cloned.actionLog.push({
        playerIndex,
        action: "allin",
        amount: shove,
        round: cloned.stage as "preflop" | "flop" | "turn" | "river",
      });
    } else {
      // shove is only a CALL
      cloned.actionLog.push({
        playerIndex,
        action: "call",
        amount: shove,
        round: cloned.stage as "preflop" | "flop" | "turn" | "river",
      });
    }

    return advanceOrEndRound(cloned);
  });
}




  function handleUpDownRaise(action: string) {
    if (action === 'up') setRaiseValue(prev => prev + MIN_BET_RAISE);
    if (action === 'down') setRaiseValue(prev => prev - MIN_BET_RAISE);
  }

  function handleUpDownBet(action: string) {
    if (action === 'up') setBetValue(prev => prev + MIN_BET_RAISE);
    if (action === 'down') setBetValue(prev => prev - MIN_BET_RAISE);
  }



const currPlayerIdx = gameState.currentPlayerIndex;
const currentPlayer = gameState.players[currPlayerIdx];

const isBBPreflop =
  gameState.stage === "preflop" &&
  currentPlayer.position === "bb" &&
  currentPlayer.currentBet === gameState.currentBet;


const toCall = gameState.currentBet - currentPlayer.currentBet;
const hasChips = currentPlayer.stack > 0;
const noBetThisRound = gameState.currentBet === 0;

const canFold = !noBetThisRound && !gameState.isGameOver && currentPlayer.currentBet<gameState.currentBet; //FIX 1: Fold only if player's current bet < global
const canCheck = !gameState.isGameOver && (noBetThisRound || isBBPreflop)
const canCall = !noBetThisRound && hasChips && !isBBPreflop && !gameState.isGameOver;

const canBet = noBetThisRound && currentPlayer.stack >= MIN_BET_RAISE && !gameState.isGameOver;
const canRaise = !noBetThisRound && currentPlayer.stack >= (toCall + raiseValue) && !gameState.isGameOver; 
const canAllIn = hasChips && !gameState.isGameOver;

const canDecBet = canBet && betValue > MIN_BET_RAISE;
const canIncBet = canBet && (betValue + MIN_BET_RAISE) <= currentPlayer.stack;

const canDecRaise = canRaise && (raiseValue - MIN_BET_RAISE) >= gameState.lastRaise && raiseValue > MIN_BET_RAISE;
const canIncRaise = canRaise && (toCall + raiseValue + MIN_BET_RAISE) <= currentPlayer.stack;

const callLabel = toCall > currentPlayer.stack ? "All In" : (toCall === 0 ? "" : toCall);

  return (
   <div className="flex gap-3 mx-auto">
  <Button 
    onClick={() => handleFold(currPlayerIdx)} 
    bg="#0269e5" 
    variant="outline" 
    disabled={!canFold}
  >
    Fold
  </Button>

  <Button
    onClick={() => handleCheck(currPlayerIdx)}
    bg="#379001"
    variant="outline"
    disabled={!canCheck}
  >
    Check
  </Button>

  <Button
    onClick={() => handleCall(currPlayerIdx)}
    bg="#379001"
    variant="outline"
    disabled={!canCall}
  >
    Call {callLabel}
  </Button>

  <div className="flex gap-1">
    <Button
      onClick={() => handleUpDownBet("down")}
      bg="#e59d02"
      variant="sign"
      disabled={!canDecBet}
    >
      -
    </Button>
    <Button
      onClick={() => handleBet(currPlayerIdx)}
      bg="#e59d02"
      variant="outline"
      disabled={!canBet}
    >
      Bet {betValue}
    </Button>
    <Button
      onClick={() => handleUpDownBet("up")}
      bg="#e59d02"
      variant="sign"
      disabled={!canIncBet}
    >
      +
    </Button>
  </div>

  <div className="flex gap-1">
    <Button
      onClick={() => handleUpDownRaise("down")}
      bg="#e59d02"
      variant="sign"
      disabled={!canDecRaise}
    >
      -
    </Button>
    <Button
      onClick={() => handleRaise(currPlayerIdx)}
      bg="#e59d02"
      variant="outline"
      disabled={!canRaise}
    >
      Raise {raiseValue}
    </Button>
    <Button
      onClick={() => handleUpDownRaise("up")}
      bg="#e59d02"
      variant="sign"
      disabled={!canIncRaise}
    >
      +
    </Button>
  </div>

  <Button
    onClick={() => handleAllIn(currPlayerIdx)}
    bg="#f86c6c"
    variant="outline"
    disabled={!canAllIn}
  >
    All IN
  </Button>
</div>

  );
}
