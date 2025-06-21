import { useState } from 'react';
import imageSrc from './assets/bigYoshi.jpeg';
import Puzzle from "./components/Puzzle";

const GRID_SIZE = 3; // 3x3 puzzle

export default function App() {
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);

  return <Puzzle imageSrc={imageSrc} gridSize={GRID_SIZE}/>
}