import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Piece from "./Piece";
import useTimer from "../hooks/useTimer";

interface PuzzleProps {
  imageSrc: string;
  gridSize: number;
  onWin: () => void;
  onLose: () => void;
  puzzleTime: number;
}

export default function Puzzle({
  imageSrc,
  gridSize,
  onWin,
  onLose,
  puzzleTime,
}: PuzzleProps) {
  const [pieces, setPieces] = useState<number[]>([]);
  const { timeLeft } = useTimer(puzzleTime, onLose);

  useEffect(() => {
    const arr = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    shuffleArray(arr);
    setPieces(arr);
  }, [gridSize]);

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const movePiece = (from: number, to: number) => {
    setPieces((prevPieces) => {
      const newPieces = [...prevPieces];
      [newPieces[from], newPieces[to]] = [newPieces[to], newPieces[from]];
      if (newPieces.every((p, i) => p === i)) {
        console.log("a");
        onWin();
      }
      return newPieces;
    });
  };

  useEffect(() => {
    const shuffle = () => {
      const arr = Array.from({ length: gridSize * gridSize }, (_, i) => i);
      shuffleArray(arr);
      setPieces(arr);
    };
    shuffle();
  }, [gridSize, imageSrc]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ maxWidth: 400, margin: "auto", fontFamily: "sans-serif" }}>
        <h3>Time left: {timeLeft}s</h3>

        <div
          style={{
            marginTop: 20,
            width: 300,
            height: 300,
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            border: "2px solid #333",
            userSelect: "none",
          }}
        >
          {pieces.map((pieceIndex, i) => (
            <Piece
              key={i}
              index={i}
              pieceIndex={pieceIndex}
              movePiece={movePiece}
              gridSize={gridSize}
              imageSrc={imageSrc}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
