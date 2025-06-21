import { useState } from "react";
import Puzzle from "./components/Puzzle";
import images from "./loadImages";
import EndScreen from "./components/EndScreen";
import StartScreen from "./components/StartScreen";

export default function App() {
  const [gameStarted, setStartGame] = useState(false);
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzleTime, setCurrentPuzzleTime] = useState(images.length + 4);
  const [gridSize, setGridSize] = useState(3);

  const onStartGame = () => {
    setPuzzlesSolved(0);
    setCurrentPuzzleIndex(0);
    setCurrentPuzzleTime(images.length + 4);
    setGridSize(3);
    setStartGame(true);
  };

  const onWin = () => {
    onNextPuzzle();
    setPuzzlesSolved(puzzlesSolved + 1);
    setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    setGridSize(gridSize + 1);
  };

  const onLose = () => {
    onNextPuzzle();
    setCurrentPuzzleIndex(currentPuzzleIndex + 1);
  };

  const onNextPuzzle = () => {
    setCurrentPuzzleTime(currentPuzzleTime - 1);
  };

  if (!gameStarted) {
    return <StartScreen onStartGame={onStartGame} />;
  }

  if (currentPuzzleIndex >= images.length) {
    return (
      <EndScreen
        puzzlesLength={images.length}
        puzzlesSolvedCorrectly={puzzlesSolved}
        onRestart={onStartGame}
      />
    );
  }

  return (
    <div style={{ display: "grid", placeItems: "center", textAlign: "center" }}>
      <h2>
        Puzzles Solved: {puzzlesSolved}/{images.length}
      </h2>
      <h3>Puzzles Left: {images.length - currentPuzzleIndex}</h3>
      <Puzzle
        imageSrc={images[currentPuzzleIndex]}
        gridSize={gridSize}
        onWin={onWin}
        onLose={onLose}
        puzzleTime={10}
      />
    </div>
  );
}
