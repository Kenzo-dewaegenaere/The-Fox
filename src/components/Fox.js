import React, { useRef /*, useState, useEffect */ } from "react";
import { useGLTF /*useAnimations */ } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, /*animations*/ } = useGLTF("/fox/scene.gltf");
  //const { actions } = useAnimations(animations, group);
  // const [name, setName] = useState("Fox_Idle");

  //  useEffect(() => {
  //    actions[name].reset().fadeIn(0.5).play();
  //    return () => actions[name].fadeOut(0.5);
  //  }, [name]);

  useFrame(({ mouse }) => {
    group.current.rotation.y = lerp(
      group.current.rotation.y,
      mouse.x * (Math.PI / 5),
      0.005
    );

    nodes.Fox_LEye_021.rotation.y = lerp(
      nodes.Fox_LEye_021.rotation.y,
      mouse.y * 2,
      -0.14
    );

    nodes.Fox_REye_022.rotation.y = lerp(
      nodes.Fox_REye_022.rotation.y,
      mouse.y * 2,
      0.14
    );

    nodes.Fox_LEye_021.rotation.z = lerp(
      nodes.Fox_LEye_021.rotation.z,
      mouse.x * 2,
      0.08
    );

    nodes.Fox_REye_022.rotation.z = lerp(
      nodes.Fox_REye_022.rotation.z,
      mouse.x * 2,
      -0.08
    );
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group name="FoxTransform" rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              // onClick={(e) => setName("Fox_Idle")}
              //onPointerEnter={(e) => setName("Fox_Sit_Yes")}
              //onPointerLeave={(e) => setName("Fox_Idle")}
              geometry={nodes.Object_9.geometry}
              material={materials["08_-_Default"]}
              skeleton={nodes.Object_9.skeleton}
            />
            <Lights />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/fox/scene.gltf");

function Lights() {
  const groupL = useRef();
  const groupR = useRef();
  const front = useRef();

  useFrame(({ clock, mouse }) => {
    groupL.current.rotation.y = lerp(
      groupL.current.rotation.y,
      -mouse.x * (Math.PI / 2),
      0.1
    );
    groupR.current.rotation.y = lerp(
      groupR.current.rotation.y,
      mouse.x * (Math.PI / 2),
      0.1
    );
    front.current.position.x = lerp(
      front.current.position.x,
      mouse.x * 12,
      0.4
    );
    front.current.position.y = lerp(
      front.current.position.y,
      7 + mouse.y * 4,
      0.4
    );
  });

  return (
    <>
      <group ref={groupL}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <group ref={groupR}>
        <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      </group>
      <spotLight
        castShadow
        ref={front}
        penumbra={1}
        angle={Math.PI / 3}
        position={[0, 0, 8]}
        distance={11}
        intensity={8}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}
