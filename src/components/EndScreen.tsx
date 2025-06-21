interface EndScreenProps {
  puzzlesLength: number;
  puzzlesSolvedCorrectly: number;
  onRestart: () => void;
}

export default function EndScreen({
  puzzlesLength,
  puzzlesSolvedCorrectly,
  onRestart,
}: EndScreenProps) {
  return (
    <div style={{ display: "grid", placeItems: "center", textAlign: "center" }}>
      <h1>
        Congrats! You've solved {puzzlesSolvedCorrectly}/{puzzlesLength} puzzles
        correctly!
      </h1>
      <h2>You're the absolute best and everyone loves you!</h2>
      <span>
        Hope you've enjoyed this clusterfuck of a game, because I sure didn't
        have any fun making it (jkjk) :)
      </span>

      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
