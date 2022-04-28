import "../styles.css";
import React from "react";
import { Link } from "react-router-dom";


export default function Button() {
  const playGame = () => {
    console.log("play");
  };

  return (
    <>
      <div className="header_player">

        <Link to="/KeyboardSelection" onClick={playGame} className="play__button">
          Click and play!
        </Link>
      </div>
    </>
  );
}
