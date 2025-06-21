import { useState } from "react";
import bigYoshi from "./assets/bigYoshi.jpeg";
import Puzzle from "./components/Puzzle";

const GRID_SIZE = 3; // 3x3 puzzle

const allPuzzles: string[] = [
  bigYoshi,
]; 

export default function App() {
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);

  const onWin = () => {
    setPuzzlesSolved(puzzlesSolved + 1);
    setCurrentPuzzleIndex(currentPuzzleIndex + 1);
  };

  const onLose = () => {};

  console.log(currentPuzzleIndex)

  return (
    <div>
      <h2>Puzzles Solved: {puzzlesSolved}/{allPuzzles.length}</h2>
      <Puzzle
        imageSrc={allPuzzles[currentPuzzleIndex]}
        gridSize={GRID_SIZE}
        onWin={onWin}
        onLose={onLose}
        puzzleTime={10}
      />
    </div>
  );
}
