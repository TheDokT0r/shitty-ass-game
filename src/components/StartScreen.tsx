interface StartScreenProps {
  onStartGame: () => void;
}

export default function StartScreen({ onStartGame }: StartScreenProps) {
  return (
    <div style={{ display: "grid", placeItems: "center", textAlign: "center" }}>
      <h1>Shitty Ass Puzzle Game</h1>
      <h2>By Orche (og oc, plz don't steal)</h2>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
}
