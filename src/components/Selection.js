import "../styles.css";
import React from "react";
import { Link } from "react-router-dom";


export default function Button() {


  return (
    <>
      <div className="header_player">

        <Link to="/De-Vos" className="selection__button">
          I'm using Azerty!
        </Link>
        <Link to="/The-fox" className="selection__button">
          I'm using Qwerty!
        </Link>

      </div>
    </>
  );
}
