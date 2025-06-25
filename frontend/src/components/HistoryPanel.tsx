export default function HistoryPanel({ history }: { history: any}) {

    return(
        <div className="h-screen w-2/5 overflow-auto">
            <h1 className="text-[35px] mb-6">History</h1>
        {history.map((hand:any, index:any) => (
        <div key={index} className="mb-4 p-2 border rounded">
          <div><strong>Hand:</strong> {hand.id}</div>
          <div><strong>Stack:</strong> {hand.stack}</div>
          <div><strong>Positions:</strong> {hand.positions}</div>
          <div><strong>Hands:</strong> {hand.hands}</div>
          <div><strong>Actions:</strong> {hand.actions}</div>
          <div><strong>Winnings:</strong> {hand.winnings}</div>

        </div>
      ))}
        </div>
    )
}