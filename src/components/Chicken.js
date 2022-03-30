import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import create from 'zustand'



export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/chicken/scene.gltf");
  const [name, setName] = useState("chicken_with_animation_1");
  const { actions } = useAnimations(animations, group);

  let chickenState = true;
  let chickenHP = 100;

  //  useLayoutEffect(() => {
  //    actions[name].reset().fadeIn(0.5).play();
  //    return () => actions[name].fadeOut(0.5);
  //  }, [name]);





  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Dynamic",
    args: [.8, .8, .8],
    fixedRotation: true,
    position: [4, .2, 2],
    onCollide: (e) => CheckImpact(e),
  }));

  const CheckImpact = (e) => {


    if (e.body.name === "bullet") {
      chickenHP = chickenHP - 5;
      console.log(chickenHP);
    }

    if (chickenHP <= 0) {
      chickenState = false;
    }
  };





  return (
    <>

      {chickenState ? (
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
      ) : null}
    </>
  );
}

useGLTF.preload("/chicken/scene.gltf");
