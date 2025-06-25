import { GameState } from "@/types/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef} from "react";
import { initializeGame } from "@/functions/gameInit";
import  toast  from 'react-hot-toast';

interface GameStateProps {
  gameState: GameState | null;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

export default function StackPanel({ gameState, setGameState }: GameStateProps) {
    const inputStackRef = useRef<HTMLInputElement>(null);

    function applyInputStack() {
        if (inputStackRef.current) {
            const newStackValue = Number(inputStackRef.current.value);
            if (!isNaN(newStackValue) && newStackValue > 0) {
                setGameState(prev => {
                    if (!prev) return initializeGame(newStackValue);

                    const players = prev.players.map(p => ({
                        ...p,
                        stack: newStackValue
                    }));
                    return { ...prev, players};

                });
                toast.success('Stack Applied!')
            }else{
                toast.error('Stacks are invalid or missing!')
            }
        }
    }

    function handleStartReset() {
        if (inputStackRef.current) {
            const newStackValue = Number(inputStackRef.current.value);
            if (!isNaN(newStackValue) && newStackValue > 0) {
                const newGame = initializeGame(newStackValue);
                setGameState({
                    ...newGame,
                    isGameStarted: true,
                });
            }else{
                toast.error('Stacks are invalid or missing!')
            }
        }
    }

    return (
        <div className="flex items-center gap-3 mt-6">
            <h2 className="text-[27px]">Stacks</h2>
            <div className="flex gap-3">
                <Input
                    ref={inputStackRef}
                    type="number"
                    min={1}
                    placeholder="Enter stack..."
                />
                <Button onClick={applyInputStack} variant="apply">
                    Apply
                </Button>
                <Button onClick={handleStartReset} variant="reset">
                    {gameState?.isGameStarted?'Reset':'Start'}
                </Button>
            </div>
        </div>
    );
}
