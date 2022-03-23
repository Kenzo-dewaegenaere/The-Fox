import { Physics } from "@react-three/cannon";
import React from "react";
import { Plane } from "../prefabs/Plane";
//import { Player } from "../prefabs/Player_OLD";
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

        <Plane />
        <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} />
      </Physics>
    </>
  );
};

export default GameScene;
