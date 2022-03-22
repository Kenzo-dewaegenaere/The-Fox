import "../styles.css";
import React from "react";

export default function Button() {
  const playGame = () => {
    console.log("play");
  };

  return (
    <>
      <div className="header_player">
        <a href="/Game" onClick={playGame} className="play__button">
          Click and play!
        </a>
      </div>
    </>
  );
}
