import "../styles.css";
import React from "react";
import { Link } from "react-router-dom";


export default function PlayAgainButton() {
  const playGame = () => {
    console.log("play");
  };

  return (
    <>
      <div className="header_player">

        <Link to="/" onClick={playGame} className="play__button">
          Click and play!
        </Link>
      </div>
    </>
  );
}
