import { useSphere } from "@react-three/cannon";
import React from "react";

export const NerfBullet = (props) => {
  const [boxRef] = useSphere(() => ({
    mass: 500,
    args: [0.1],
    ...props
  }));
  return (
    <>

      <mesh name={'bullet'} ref={boxRef} castShadow>
        <boxBufferGeometry attach="geometry" args={[.05, .05, .15]} />
        <meshLambertMaterial color="orange" />
      </mesh>


    </>

  );
};
