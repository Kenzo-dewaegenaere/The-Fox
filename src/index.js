import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Game from "./scene/Game";
import Completed from "./scene/Completed";
import EndScene from "./scene/EndScene";
import "./styles.css";

//import { Crosshair } from "./components/Crosshair";
//import { UI } from "./components/UI";

const rootElement = document.getElementById("root");


render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Game" element={<Game />} />
      <Route path="Completed" element={<Completed />} />
      <Route path="EndScene" element={<EndScene />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
