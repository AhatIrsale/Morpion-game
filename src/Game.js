import React, { useState, useEffect } from "react";
import Board from "./Board";
import ComputerPlayer from "./ComputerPlayer";
import "./App.css";
const Game = ({ gameMode }) => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [gameModeChosen, setGameModeChosen] = useState(false); 
  useEffect(() => {
    if (gameMode === "player-vs-computer" && currentPlayer === "X") {
      handleComputerMove();
    }
  }, [currentPlayer, gameMode]);
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  

  const handleClick = (i) => {
    const current = history[stepNumber];
    const squares = current.squares.slice();
    if (!calculateWinner(squares) && !squares[i]) {
      squares[i] = xIsNext ? "X" : "O";
      setHistory((prevHistory) => prevHistory.concat([{ squares: squares }]));
      setXIsNext((prevXIsNext) => !prevXIsNext);
      setStepNumber((prevStepNumber) => history.length);
      if (
        gameMode === "player-vs-computer" &&
        gameModeChosen &&
        currentPlayer === "X"
      ) {
        setCurrentPlayer("O"); // Update currentPlayer state only if it's the player's turn
        handleComputerMove();
      } else {
        setCurrentPlayer((prevCurrentPlayer) => (xIsNext ? "O" : "X"));
      }
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  
  const resetGame = () => {
    // Function to reset the game
    setHistory([{ squares: Array(9).fill(null) }]);
    setXIsNext(true);
    setStepNumber(0);
    setCurrentPlayer("X");
  };
  const handleComputerMove = () => {
    const current = history[stepNumber];
    const squares = current.squares.slice();
    const computerPlayer = new ComputerPlayer(
      squares,
      currentPlayer,
      difficultyLevel
    );
    const move = computerPlayer.generateMoves(squares); // Pass squares array as argument
    squares[move] = currentPlayer;
    setHistory((prevHistory) => prevHistory.concat([{ squares: squares }]));
    setXIsNext((prevXIsNext) => !prevXIsNext);
    setStepNumber((prevStepNumber) => history.length);
    setCurrentPlayer((prevCurrentPlayer) => (xIsNext ? "O" : "X"));
  };
  /***addd */

  /**/
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = `Le gagnant est ${winner} !`;
  } else if (stepNumber === 9) {
    status = "Match nul !";
  } else {
    status = `C'est au tour de ${xIsNext ? "X" : "O"}.`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="my">  <div className="game-info">
        <div className="status">{status}</div>
        <div className="centerButton">
          <button className="reset-button" onClick={resetGame}>
            Rejouer
          </button>{" "}
          {/* Reset button */}
        </div>

        {gameMode === "player-vs-computer" && currentPlayer === "X" && (
          // Call handleComputerMove() here
          <div>
            <label htmlFor="difficultyLevel">
              Difficulté de l'ordinateur :
            </label>
            <select
              id="difficultyLevel"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="hard">Difficile</option>
            </select>
          </div>
        )}
      </div></div>
    </div>
  );
};
export default Game;
