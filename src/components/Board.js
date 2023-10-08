import React from "react";
import Box from "./Box";
import "./Board.css";

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, id) => {
        return (
          <Box
            key={id}
            value={value}
            onClick={() => value === null && onClick(id)}
          />
        );
      })}
    </div>
  );
};

export default Board;
