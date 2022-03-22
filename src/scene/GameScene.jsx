import { Physics } from "@react-three/cannon";
import React, { Suspense, useEffect, useRef } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { Plane } from "../prefabs/Plane";
import { Player } from "../prefabs/Player";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { Cube } from "../prefabs/Cube";

const GameScene = () => {
  return (
    <>
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

export default GameScene;
