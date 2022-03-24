import React, { useRef, useState, useLayoutEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";


export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/chicken/scene.gltf");
  const [name, setName] = useState("chicken_with_animation_1");
  const { actions } = useAnimations(animations, group);

  let chickenHealth = 100;

  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Dynamic",
    args: [.8, .8, .8],
    fixedRotation: true,
    position: [4, .2, 2],
    onCollide: (e) => byeChicken(e),
  }));

  const byeChicken = (e) => {

    if (e.body.name === "bullet") {
      console.log("hit");
      chickenHealth = chickenHealth - 25;
    }

  };

  useFrame(() => {

    if (chickenHealth <= 0) {

      console.log("dead");
    }
  });

  //  console.log(actions);

  //  useLayoutEffect(() => {
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