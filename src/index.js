import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Game from "./scene/Game";
import Game_azerty from "./scene/Game_Azerty";
import Completed from "./scene/Completed";
import EndScene from "./scene/EndScene";
import KeyboardSelection from "./scene/KeyboardSelection";
import "./styles.css";

//import { Crosshair } from "./components/Crosshair";
//import { UI } from "./components/UI";

const rootElement = document.getElementById("root");


render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/keyboardSelection" element={<KeyboardSelection />} />
      <Route path="The-Fox" element={<Game />} />
      <Route path="De-Vos" element={<Game_azerty />} />
      <Route path="EndScene" element={<EndScene />} />
      <Route path="Completed" element={<Completed />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
