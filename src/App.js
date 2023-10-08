import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import ResetButton from "./components/ResetButton";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoxClick = (boxId) => {
    console.log("Box Clicked!");

    // update the board
    const updatedBoard = board.map((value, index) => {
      if (index === boxId) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        console.log({ ...scores, oScore });
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        console.log({ ...scores, xScore });
        setScores({ ...scores, xScore });
      }
    }

    // change active player
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let condition of WIN_CONDITIONS) {
      const [x, y, z] = condition;

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        console.log(`${board[x]} Won the game!`);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
