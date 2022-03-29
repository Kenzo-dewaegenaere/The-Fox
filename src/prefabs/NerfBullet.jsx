import { useBox } from "@react-three/cannon";
import React from "react";

export const NerfBullet = (props) => {
  const [boxRef] = useBox(() => ({
    mass: 5,
    args: [.05, .05, .15],
    ...props
  }));

  return (
    <mesh name={'bullet'} ref={boxRef} castShadow>
      <boxBufferGeometry attach="geometry" args={[.05, .05, .15]} />
      <meshLambertMaterial color="blue" />
    </mesh>
  );
};
