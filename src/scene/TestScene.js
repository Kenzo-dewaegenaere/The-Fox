import "../styles.css";
import React, { Suspense, useEffect, useRef } from "react";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Html, Stars, Stats } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
//import GameScene from "../scene/GameScene";
import Fox from "../components/Fox";
import { Plane } from "../prefabs/Plane";

extend({ PointerLockControls });

export default function Game() {
  return (
    <>
      <Canvas>
        <PointerLockControl />
        <PostProcessing />
        <Lights />
        <Stars />

        <Plane />
        <Scene />
      </Canvas>
    </>
  );
}

const Scene = () => {
  return (
    <>
      <Suspense
        fallback={
          <Html center className="loader">
            LOADING
          </Html>
        }
      >
        <Fox scale={0.1} position={[0, -1.5, 4]} rotation={[-0.1, 0, 0]} />


      </Suspense>
      <Stats />
    </>
  );
};

const PointerLockControl = () => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  return <pointerLockControls ref={controls} args={[camera, gl.domElement]} />;
};

const Lights = () => {
  return (
    <>
      <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
      <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      <spotLight
        castShadow
        penumbra={1}
        angle={Math.PI / 3}
        position={[0, 0, 8]}
        distance={11}
        intensity={8}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
};

const PostProcessing = () => {
  return (
    <>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={2} height={300} />
        <Noise opacity={0.12} />
        <Vignette eskil={false} offset={0.1} darkness={1.5} />
      </EffectComposer>
    </>
  );
};
