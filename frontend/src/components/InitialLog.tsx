import { Player } from "@/types/types";

export default function InitialLog({ initialPlayers }: { initialPlayers: Player[] }) {
    const dealerIndex = initialPlayers.findIndex(player => player.position === 'd')+1;
    const sbIndex = initialPlayers.findIndex(player => player.position === 'sb')+1;
    const bbIndex = initialPlayers.findIndex(player => player.position === 'bb')+1;

    return (
        <ul>
            {initialPlayers.map((player, index) => (
                <li key={`cards-${index}`}>
                    Player {index + 1} is dealt {player.holeCards[0]}{player.holeCards[1]}
                </li>
            ))}
            <li>---</li>
            <li>Player {dealerIndex} is the dealer</li>
            <li>Player {sbIndex} posts small blind - 20 chips</li>
            <li>Player {bbIndex} posts big blind - 40 chips</li>
            <li>---</li>
        </ul>
    );
}
