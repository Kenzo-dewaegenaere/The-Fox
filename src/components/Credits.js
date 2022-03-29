import "../styles.css";
import { Canvas } from "@react-three/fiber";
import { Html, Stats } from "@react-three/drei";
import React, { Suspense } from "react";
import Fox from "./Fox.js";
import CreditsHtml from "./CreditsHtml";

export default function Game() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 12], fov: 20, near: 7, far: 15 }}
      >
        <fog attach="fog" args={["black", 0, 20]} />
        <Suspense
          fallback={
            <Html center className="loader">
              LOADING
            </Html>
          }
        >
          <Fox scale={0.1} position={[0, -1.5, 4]} rotation={[-0.1, 0, 0]} />
          <ambientLight />
        </Suspense>
        <Stats />
      </Canvas>
      <CreditsHtml />
    </>
  );
}
