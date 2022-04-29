import "../styles.css";
import React, { Suspense, useEffect, useRef, useState, useCallback } from "react";
import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Html, Stars, Stats, PerspectiveCamera, Billboard, Text, Loader } from "@react-three/drei";
import { Physics, usePlane, useSphere, useBox, Debug } from "@react-three/cannon";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Vector3, Raycaster } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import niceColors from "nice-color-palettes";


//Hooks
import { useKeyboardInput } from "../hooks/useKeyboardInput";
import { useMouseInput } from "../hooks/useMouseInput";
import { useVariable } from "../hooks/useVariable";




//prefabs
import { NerfBullet } from "../prefabs/NerfBullet";
import Objects from "../prefabs/Objects";

//Components
import Chicken from "../components/Chicken";
import Mountain from "../components/Mountain";

//UI
import { Crosshair } from "../components/Crosshair";
import { Interface } from "../components/Interface";



extend({ PointerLockControls });

export default function Game() {
  return (
    <>
      <Interface>
        <Crosshair />
      </Interface>
      <Canvas>
        <PointerLockControl />
        <PostProcessing />
        <Lights />
        <Stars />
        <Scene />
      </Canvas>
      <Loader />
    </>
  );
}

const Scene = () => {

  return (
    <>
      <Suspense
        fallback={null
        }
      >
        <Physics
          gravity={[0, -9, 0]}
          tolerance={0}
          iterations={50}
          broadphase={"SAP"}>

          <Chicken scale={.3} position={[0, -.4, 0]} />

          <Player />


          <Plane />
          <Edges />
          <Cube position={[0, 0, -5]} layers={1} />
          <Cube position={[0.6, 0, -5]} />
          <Cube position={[-0.6, 0, -5]} />
          <Objects />
          <Mountains scale={.6} />

        </Physics>
        <UI />
        <fog attach="fog" args={["black", 0, 15]} />
      </Suspense>
    </>
  );
};

const UI = () => {

  //Text ui ( to explain game mechanics)

  return (
    <>
      <Billboard
        follow={false}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text position={[-0.6, 5.5, -15]} fontSize={1}>Welcome to the barbaren game,</Text>
        <Text position={[-0.6, 4.5, -15]} fontSize={1}>find and shoot the evil chicken!</Text>

        <Text position={[-0.6, 2.5, -15]} fontSize={.5}>use your keyboard and mouse to navigate</Text>
      </Billboard>

    </>
  );
};


const PointerLockControl = () => {

  //camera and pointerlock handlers

  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  return <pointerLockControls ref={controls} args={[camera, gl.domElement]} />;
};

const Lights = () => {

  // lights

  return (
    <>
      <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
      <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
      <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      <pointLight position={[0, 7, -15]} distance={15} intensity={10} />
      <spotLight
        castShadow
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
};

const Mountains = () => {

  //background fillers making the scen looking more realistic

  return (
    <>
      <Mountain position={[150, -5, -5]} />
      <Mountain position={[150, -5, -100]} />
      <Mountain position={[4, -25, 100]} />
      <Mountain position={[-50, -15, 100]} />
      <Mountain position={[55, -15, 85]} />
      <Mountain position={[80, -15, 120]} />
      <Mountain position={[110, -15, 150]} />
    </>
  );
};

const Edges = () => {

  //invisible edges, creates an arena effect. Maybe adding fences later
  const [Edge_one] = useBox(() => ({
    mass: 1,
    type: "Static",
    args: [125, 20, 2],
    position: [0, Math.PI / 2, -10],
    material: {
      friction: 1,
    },
  }));

  const [Edge_three] = useBox(() => ({
    mass: 1,
    type: "Static",
    args: [125, 20, 2],
    position: [-10, -2, 52],
    rotation: [0, Math.PI / 2, 0],
    material: {
      friction: 1,
    },
  }));

  const [Edge_two] = useBox(() => ({
    mass: 1,
    type: "Static",
    args: [125, 20, 2],
    position: [50, -2, 52],
    rotation: [0, Math.PI / 2, 0],
    material: {
      friction: 1,
    },
  }));

  const [Edge_four] = useBox(() => ({
    mass: 1,
    type: "Static",
    args: [125, 20, 2],
    position: [0, Math.PI / 2, 60],
    material: {
      friction: 1,
    },
  }));






  return (

    <>


    </>
  );
};

const PostProcessing = () => {
  return (
    <>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={9} height={300} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.5} />
      </EffectComposer>
    </>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0, 0],
    material: {
      friction: 0.1,
    },
  }));

  return (
    <mesh ref={ref} receiveShadow={true} scale={[1000, 1000, 1000]}>
      <planeBufferGeometry />
      <meshPhongMaterial color={"#1e226e"} receiveShadow />
    </mesh>
  );
};


export const Cube = (props) => {

  const paletteIndex = 8;
  const [color, setColor] = useState("white");
  const [cubeRef, /*api*/] = useBox(() => ({
    mass: 1,
    args: [0.5, 0.5, 0.5],
    material: {
      friction: 1,
      restitution: 0
    },
    ...props
  }));

  useEffect(
    () =>
      setColor(
        niceColors[paletteIndex][
        Math.floor(Math.random() * niceColors[paletteIndex].length)
        ]
      ),
    []
  );

  return (
    <mesh ref={cubeRef} castShadow layers={props.layers}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshLambertMaterial color={color} />
    </mesh>

  );
};

const Player = () => {
  const speed = 200;
  const bulletSpeed = 35;
  const bulletCoolDown = 300;
  const jumpSpeed = 3;
  const jumpCoolDown = 400;

  const { camera, scene } = useThree();



  const [sphereRef, api] = useSphere(() => ({
    mass: 100,
    type: "Dynamic",
    fixedRotation: true,
    position: [0, .5, 0],
    args: [0.4],
    material: {
      friction: 0,
    },
  }));


  const [bullets, setBullets] = useState([]);
  const pressed = useKeyboardInput(["z", "q", "s", "d", " "]);
  const pressedMouse = useMouseInput();

  const input = useVariable(pressed);
  const mouseInput = useVariable(pressedMouse);

  const state = useRef({
    timeToShoot: 0,
    timeTojump: 0,
    vel: [0, 0, 0],
    jumping: false,
  });



  useEffect(() => {
    api.velocity.subscribe((v) => (state.current.vel = v));
  }, [api]);

  const pos = useRef([0, 0, 0])


  useEffect(() => api.position.subscribe(v => pos.current = v), [])

  useFrame((canvasState, delta) => {

    const { z, q, s, d } = input.current;
    const space = input.current[" "];

    let velocity = new Vector3(0, 0, 0);
    let cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    let forward = new Vector3();
    forward.setFromMatrixColumn(camera.matrix, 0);
    forward.crossVectors(camera.up, forward);

    let right = new Vector3();
    right.setFromMatrixColumn(camera.matrix, 0);

    let [horizontal, vertical] = [0, 0];


    if (z) {
      vertical += 1;
    }
    if (s) {
      vertical -= 1;
    }
    if (d) {
      horizontal += 1;
    }
    if (q) {
      horizontal -= 1;
    }

    if (horizontal !== 0 && vertical !== 0) {
      velocity
        .add(forward.clone().multiplyScalar(speed * vertical))
        .add(right.clone().multiplyScalar(speed * horizontal));
      velocity.clampLength(-speed, speed);
    } else if (horizontal !== 0) {
      velocity.add(right.clone().multiplyScalar(speed * horizontal));
    } else if (vertical !== 0) {
      velocity.add(forward.clone().multiplyScalar(speed * vertical));
    }

    api.velocity.set(
      velocity.x * delta,
      state.current.vel[1],
      velocity.z * delta
    );



    if (state.current.jumping && state.current.vel[1] < 0) {
      const raycaster = new Raycaster(
        sphereRef.current.position,
        new Vector3(0, -1, 0),
        0,
        0.2
      );
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length == 0) {
        setTimeout(function () {
          state.current.jumping = false;
        }, 3500);

      }
    }

    if (space && !state.current.jumping) {
      const now = Date.now();
      if (now > state.current.timeTojump) {
        state.current.timeTojump = now + jumpCoolDown;
        state.current.jumping = true;
        api.velocity.set(state.current.vel[0], jumpSpeed, state.current.vel[2]);
      } else {

      }
    }

    const bulletDirection = cameraDirection.clone().multiplyScalar(bulletSpeed);
    const bulletPosition = pos.current;


    if (mouseInput.current.left) {
      const now = Date.now();
      if (now >= state.current.timeToShoot) {
        state.current.timeToShoot = now + bulletCoolDown;
        setBullets((bullets) => [
          ...bullets,
          {
            id: now,
            position: [bulletPosition[0], bulletPosition[1] + .5, bulletPosition[2]],
            forward: [bulletDirection.x, bulletDirection.y, bulletDirection.z],
            name: "bullet",

          },
        ]);
        //if (bullets.length > 10) {
        //  setBullets([]);
        //}

      }
    }

  })

  return (
    <>

      {bullets.map((bullet) => {
        return (
          <NerfBullet

            key={bullet.id}
            velocity={bullet.forward}
            position={bullet.position}

          />

        );
      })}

      <group ref={sphereRef}>
        <PerspectiveCamera makeDefault />
      </group>
    </>
  );
};



