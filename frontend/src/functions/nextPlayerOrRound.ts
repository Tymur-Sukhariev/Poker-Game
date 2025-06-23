import { GameState } from "@/types/types";
import { getNextStage } from "./getNextStage";
import { getFirstToAct } from "./getFirstToAct";
import { MIN_BET_RAISE } from "@/components/ActionPanel";



//advanceOrEndRound -> RETURNS GameState: next round OR next player in the same round:
export function advanceOrEndRound(gameState: GameState): GameState {
      const totalPlayers = gameState.players.length;
      const nonFoldedPlayers = gameState.players.filter(p => !p.isFolded);


      //if BB acted in preflop, we can go to next round
      const bbIndex = gameState.players.findIndex(p => p.position === "bb");
      if (
          gameState.stage === "preflop" &&
          gameState.currentPlayerIndex === bbIndex &&
          !gameState.bbActedInPreflop
      ) {
          gameState.bbActedInPreflop = true;
        }


        //if all folded but one
        if (nonFoldedPlayers.length === 1) {
          return {
            ...gameState,
            stage: "showdown",
            isGameOver: true,
          };
        }


        //if everyone went "ALL IN" before the last round: show all cards and finish
        const allAllIn = nonFoldedPlayers.every(p => p.isAllIn || p.stack === 0);

        if (allAllIn && gameState.stage !== "showdown") {
          let newBoard = [...gameState.board];
          const newActionLog = [...gameState.actionLog];


        if (gameState.stage === "preflop") {
            newBoard.push(...gameState.deck.slice(0, 3)); // Flop
            newBoard.push(...gameState.deck.slice(3, 4)); // Turn
            newBoard.push(...gameState.deck.slice(4, 5)); // River
        
            newActionLog.push(
              {
                playerIndex: -1,
                action: "deal_flop",
                cards: gameState.deck.slice(0, 3),
                round: "flop"
              },
              {
                playerIndex: -1,
                action: "deal_turn",
                cards: gameState.deck.slice(3, 4),
                round: "turn"
              },
              {
                playerIndex: -1,
                action: "deal_river",
                cards: gameState.deck.slice(4, 5),
                round: "river"
              }
            );
          } else if (gameState.stage === "flop") {
            newBoard.push(...gameState.deck.slice(3, 4)); // Turn
            newBoard.push(...gameState.deck.slice(4, 5)); // River
          
            newActionLog.push(
              {
                playerIndex: -1,
                action: "deal_turn",
                cards: gameState.deck.slice(3, 4),
                round: "turn"
              },
              {
                playerIndex: -1,
                action: "deal_river",
                cards: gameState.deck.slice(4, 5),
                round: "river"
              }
            );
          } else if (gameState.stage === "turn") {
            newBoard.push(...gameState.deck.slice(4, 5)); // River
          
            newActionLog.push({
              playerIndex: -1,
              action: "deal_river",
              cards: gameState.deck.slice(4, 5),
              round: "river"
            });
          }
        
          return {
            ...gameState,
            board: newBoard,
            stage: "showdown",
            isGameOver: true,
            actionLog: newActionLog
          };
        }


        //take players who are still in the game
      const playersToAct = nonFoldedPlayers.filter(p => !p.isAllIn && p.stack > 0);

      //if all called highest bet
      const allMatched = 
        playersToAct.every(p => p.currentBet === gameState.currentBet) && 
        gameState.currentBet>0;

        // all skipped betting
      const everyoneChecked = 
        gameState.currentBet === 0 && 
        gameState.checkCount === playersToAct.length


        //MOVE to next round:
      if (playersToAct.length === 0 || (allMatched&&gameState.bbActedInPreflop) || everyoneChecked) {
        const players = gameState.players.map(p => ({
          ...p,
          currentBet: 0, //for each player
        }));

        const nextStage = getNextStage(gameState.stage);

        if (nextStage === "showdown"){
            return{             
            ...gameState,
            stage: "showdown",
            isGameOver: true,
            }
        }

        const newBoard = [...gameState.board]; //cloned community cards
        const newActionLog = [...gameState.actionLog];

        if (nextStage === "flop") {
          newBoard.push(...gameState.deck.slice(0, 3)); // add flop cards
          newActionLog.push({
            playerIndex: -1,
            action: "deal_flop",
            cards: gameState.deck.slice(0, 3),
            round: "flop"
          });
        } else if (nextStage === "turn") {
          newBoard.push(...gameState.deck.slice(3, 4)); // add turn card
          newActionLog.push({
            playerIndex: -1,
            action: "deal_turn",
            cards: gameState.deck.slice(3, 4),
            round: "turn"
          });
        } else if (nextStage === "river") {
          newBoard.push(...gameState.deck.slice(4, 5)); // add river card
          newActionLog.push({
            playerIndex: -1,
            action: "deal_river",
            cards: gameState.deck.slice(4, 5),
            round: "river"
          });
        }


        //first player for a new round
        const nextPlayerIndex = getFirstToAct(players, nextStage);

        console.log("new ROUND:", nextStage);
        console.log("board:", newBoard);

        return {
          ...gameState,
          stage: nextStage,
          players,
          board: newBoard,
          currentBet: 0,
          lastRaise: MIN_BET_RAISE,
          currentPlayerIndex: nextPlayerIndex,
          checkCount: 0,
          actionLog: newActionLog,
        };

      }

      // Find next player to act within one round (increase currentPlayerIndex)
      for (let i = 1; i <= totalPlayers; i++) {
        const candidate = (gameState.currentPlayerIndex + i) % totalPlayers;
        const player = gameState.players[candidate];

        if (!player.isFolded && !player.isAllIn && player.stack > 0) {
          return {
            ...gameState,
            currentPlayerIndex: candidate
          };
        }
      }

      //DOES NOT have to happen
      alert("UNEXPECTED HAPPENED!");
      return gameState;
    }

    