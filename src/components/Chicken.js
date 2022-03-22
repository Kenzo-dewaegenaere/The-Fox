import React, { useRef, useState, useLayoutEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";
import { useFrame, useGraph, useThree } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/chicken/scene.gltf");
  const [name, setName] = useState("chicken_with_animation_1");

  const [ref, api] = useCylinder(() => ({
    mass: 80,
    type: "Dynamic",
    args: [0.4, 1],
    fixedRotation: true,
    position: [3, 0.8, 2],
  }));

  const { actions } = useAnimations(animations, group);
  //console.log(actions);

  // useLayoutEffect(() => {
  //    actions[name].reset().fadeIn(0.5).play();
  //    return () => actions[name].fadeOut(0.5);
  //  }, [name]);

  return (
    <mesh ref={ref}>
      <group ref={group} {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.03}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes.Object_6.geometry}
              material={nodes.Object_6.material}
              skeleton={nodes.Object_6.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Object_7.geometry}
              material={nodes.Object_7.material}
              skeleton={nodes.Object_7.skeleton}
            />
          </group>
        </group>
      </group>
    </mesh>
  );
}

useGLTF.preload("/chicken/scene.gltf");
