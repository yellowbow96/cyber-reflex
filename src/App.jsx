import "./App.css";

import { useState } from "react";

export default function App() {

  // ================= GAME STATE =================

  const [gameState, setGameState] = useState("waiting");

  const [reactionTime, setReactionTime] = useState(0);

  const [highScore, setHighScore] = useState(null);

  const [message, setMessage] = useState(
    "Click START to begin"
  );

  // ================= START GAME =================

  function startGame() {

    setGameState("loading");

    setMessage("WAIT FOR GREEN...");

    const randomDelay =
      Math.random() * 4000 + 2000;

    setTimeout(() => {

      setGameState("ready");

      window.startTime = Date.now();

      setMessage("CLICK NOW!");

    }, randomDelay);

  }

  // ================= HANDLE CLICK =================

  function handleClick() {

    // TOO EARLY
    if(gameState === "loading"){

      setMessage("TOO EARLY!");

      setGameState("waiting");

      return;

    }

    // SUCCESS
    if(gameState === "ready"){

      const endTime = Date.now();

      const reaction =
        endTime - window.startTime;

      setReactionTime(reaction);

      // HIGH SCORE
      if(highScore === null || reaction < highScore){

        setHighScore(reaction);

      }

      setMessage(`Reaction Time: ${reaction} ms`);

      setGameState("finished");

    }

  }

  // ================= RESET =================

  function resetGame(){

    setReactionTime(0);

    setMessage("Click START to begin");

    setGameState("waiting");

  }

  return (

    <div className={`app ${gameState}`}>

      {/* ================= TITLE ================= */}

      <h1 className="title">
        CYBER REFLEX
      </h1>

      {/* ================= MESSAGE ================= */}

      <div
        className="message"
        onClick={handleClick}
      >

        {message}

      </div>

      {/* ================= BUTTONS ================= */}

      <div className="controls">

        {
          gameState === "waiting" && (

            <button onClick={startGame}>
              START
            </button>

          )
        }

        {
          gameState === "finished" && (

            <button onClick={resetGame}>
              RETRY
            </button>

          )
        }

      </div>

      {/* ================= SCOREBOARD ================= */}

      <div className="scoreboard">

        {/* LAST SCORE */}

        <div className="score-card">

          <h2>LAST SCORE</h2>

          <p>
            {
              reactionTime > 0
                ? `${reactionTime} ms`
                : "--"
            }
          </p>

        </div>

        {/* HIGH SCORE */}

        <div className="score-card">

          <h2>BEST SCORE</h2>

          <p>
            {
              highScore !== null
                ? `${highScore} ms`
                : "--"
            }
          </p>

        </div>

      </div>

    </div>

  );

}