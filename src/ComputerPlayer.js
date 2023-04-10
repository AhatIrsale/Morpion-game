import React from "react";

class ComputerPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.generateMoves = this.generateMoves.bind(this);
  }

  generateMoves(squares) {
    const availableMoves = [];
    squares.forEach((square, i) => {
      if (square === null) {
        availableMoves.push(i);
      }
    });
    if (this.props.difficultyLevel === "easy") {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (this.props.difficultyLevel === "medium") {
      const random = Math.random();
      if (random < 0.5) {
        return availableMoves[
          Math.floor(Math.random() * availableMoves.length)
        ];
      } else {
        const cornerMoves = [0, 2, 6, 8];
        const cornerAvailableMoves = cornerMoves.filter((move) =>
          availableMoves.includes(move)
        );
        if (cornerAvailableMoves.length > 0) {
          return cornerAvailableMoves[
            Math.floor(Math.random() * cornerAvailableMoves.length)
          ];
        } else {
          return availableMoves[
            Math.floor(Math.random() * availableMoves.length)
          ];
        }
      }
    } else {
      const corners = [0, 2, 6, 8];
      const cornerSquares = squares.filter((square, i) => corners.includes(i));
      const cornerMoves = cornerSquares
        .map((square, i) => {
          if (square === null) {
            return corners[i];
          } else {
            return null;
          }
        })
        .filter((move) => move !== null);
      if (cornerMoves.length > 0) {
        return cornerMoves[Math.floor(Math.random() * cornerMoves.length)];
      } else if (squares[4] === null) {
        return 4;
      } else {
        return availableMoves[
          Math.floor(Math.random() * availableMoves.length)
        ];
      }
    }
  }

  render() {
    return null;
  }
}
export default ComputerPlayer;
