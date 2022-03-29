import { useBox } from "@react-three/cannon";
import React from "react";

export const NerfBullet = (props) => {
  const [boxRef] = useBox(() => ({
    mass: 5,
    args: [.05, .05, .15],
    ...props
  }));

  return (
    <>

      <mesh ref={boxRef}>
        <mesh name={'tip'} ref={boxRef} castShadow>
          <boxBufferGeometry attach="geometry" args={[.04, .04, .2]} />
          <meshLambertMaterial color="#b36200" />
        </mesh>

        <mesh name={'bullet'} ref={boxRef} castShadow>
          <boxBufferGeometry attach="geometry" args={[.05, .05, .15]} />
          <meshLambertMaterial color="blue" />
        </mesh>
      </mesh>

    </>

  );
};
