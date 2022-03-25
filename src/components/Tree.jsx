import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/tree/scene.gltf");

  const [ref] = useCylinder(() => ({
    type: "Static",
    mass: 100,
    args: [0.8, 1, 9],
    ...props,
  }));


  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-0.27, 0.6, 1.93]} />
        <group scale={0.17}>
          <mesh


            geometry={nodes.Plane_0.geometry}
            material={materials["Material.001"]}
          />
          <mesh


            geometry={nodes.Plane_1.geometry}
            material={materials["Material.002"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/tree/scene.gltf");
