
import React, { useState } from "react";
import Board from "./Board";
import Game from "./Game";

function App() {
  const [gameMode, setGameMode] = useState("player-vs-player");
  const [gameKey, setGameKey] = useState(0);
  const handleGameReset = () => setGameKey(gameKey + 1);

  return (
    <div >
     <div className="my"><h1 className="title">Jeux De Morpion</h1></div> 
      <Game key={gameKey} gameMode={gameMode} onReset={handleGameReset} />
      <div className="my"><div className="radio-container">
        <label>
          <input
            type="radio"
            name="gameMode"
            value="player-vs-player"
            checked={gameMode === "player-vs-player"}
            onChange={() => setGameMode("player-vs-player")}
          />
          <span>Joueur contre Joueur</span>
        </label>
        <label>
          <input
            type="radio"
            name="gameMode"
            value="player-vs-computer"
            checked={gameMode === "player-vs-computer"}
            onChange={() => setGameMode("player-vs-computer")}
          />
          <span>Joueur contre Ordinateur</span>
        </label>
      </div></div>
    </div>
  );
}

export default App;
