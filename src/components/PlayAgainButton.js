import "../styles.css";
import React from "react";

export default function PlayAgainButton() {
  const playGame = () => {
    console.log("play");
  };

  return (
    <>
      <div className="header_player">
        <a href="/" onClick={playGame} className="play__button">
          Click and play!
        </a>
      </div>
    </>
  );
}
