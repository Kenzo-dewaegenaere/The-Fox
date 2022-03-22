import { Physics } from "@react-three/cannon";
import React, { Suspense, useEffect, useRef } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { Plane } from "../prefabs/Plane";
import { Player } from "../prefabs/Player";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Cube } from "../prefabs/Cube";

extend({ PointerLockControls });

export const DefaultScene = () => {
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

  return (
    <>
      <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
      <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
      <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
      <ambientLight intensity={0.6} />
      <Physics
        gravity={[0, -9, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        <Player />
        <Plane />
        <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} />
      </Physics>
    </>
  );
};

export default DefaultScene;
