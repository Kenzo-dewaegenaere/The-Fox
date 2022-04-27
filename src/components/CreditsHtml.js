import React from "react";

const CreditsHtml = () => {
  return (
    <>
      <div className="App">
        <div className="header">
          <span className="active">De Barbaren</span>
        </div>

        <div className="header_player">
          <a href="/" className="play__button_credits">
            Back to start!
          </a>
        </div>

        <div className="header_credits">

          <div className="">
            <h1>credits</h1>
          </div>

          <p>
            The models that are used aren't mine so all credits go towards them.
          </p>

          <div className="header_credits_authors">
            <p> Authors: </p>
            <ul>

              <li>rmdkurnya</li>
              <li>dfnze324</li>
              <li>Anskar</li>
              <li>Artbake Graphics</li>
              <li>Bull studios</li>
              <li>Kotzuo</li>
              <li>pxltiger</li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
};

export default CreditsHtml;
