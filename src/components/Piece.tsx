import { useDrag, useDrop } from "react-dnd";

interface PieceProps {
  index: number; // position in grid (0 to GRID_SIZE^2 - 1)
  pieceIndex: number; // which piece this is (0 to GRID_SIZE^2 - 1)
  movePiece: (from: number, to: number) => void;
  gridSize: number;
  imageSrc: string;
}

const ItemTypes = {
  PIECE: "piece",
};

export default function Piece({ index, pieceIndex, movePiece, gridSize, imageSrc }: PieceProps) {
  // Drag source
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.PIECE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop target
  const [, dropRef] = useDrop({
    accept: ItemTypes.PIECE,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        movePiece(item.index, index);
        item.index = index; // update drag item index to prevent redundant calls
      }
    },
  });

  const row = Math.floor(pieceIndex / gridSize);
  const col = pieceIndex % gridSize;
  const bgPosX = (col * 100) / (gridSize - 1);
  const bgPosY = (row * 100) / (gridSize - 1);

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{
        border: "1px solid #999",
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        width: "100%",
        height: "100%",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
}