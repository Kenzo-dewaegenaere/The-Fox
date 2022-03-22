import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Canvas } from "react-three-fiber";
import { DefaultScene } from "./scene/DefaultScene";
import TestScene from "./scene/TestScene";
import "./styles.css";

//import { Crosshair } from "./components/Crosshair";
//import { UI } from "./components/UI";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="game"
        element={
          <Canvas shadowMap>
            <DefaultScene />
          </Canvas>
        }
      />
      <Route path="test" element={<TestScene />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
