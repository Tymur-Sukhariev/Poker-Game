'use client'

import { gameGet } from "@/api/gameGET";
import ActionPanel from "@/components/ActionPanel";
import CurrentInfoPanel from "@/components/CurrentInfoPanel";
import HistoryPanel from "@/components/HistoryPanel";
import LogPanel from "@/components/LogPanel";
import StackPanel from "@/components/StackPanel";
import { GameState, HandHistoryItem } from "@/types/types";
import { useEffect, useState } from "react";



export default function Home() {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [history, setHistory] = useState<HandHistoryItem[]>([]);

    async function refreshHistory() {
        try {
            const data = await gameGet();
            setHistory(data);
          } catch (err) {
            console.error("Failed to refresh history:", err);
          }
    };

    useEffect(() => {
      refreshHistory();
    }, []);

  return (
    <main className="flex justify-between px-24 pt-[30px] items-start">
      <div className="h-screen w-1/2 flex flex-col pb-[80px]">
        <h1 className="text-4xl text-gray-600 mb-4">Playing field log</h1>
        <StackPanel gameState={gameState} setGameState={setGameState}/> 

        {gameState?.isGameStarted && (
          <>
            <LogPanel gameState={gameState}/>
            <CurrentInfoPanel gameState={gameState}/>
            <ActionPanel gameState={gameState} setGameState={setGameState} refreshHistory={refreshHistory}/>
          </>
        )
        }
      </div>

      <HistoryPanel history={history}/>
    </main>
  );
}
