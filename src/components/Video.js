import "../styles.css";
import React from "react";
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useAspect } from '@react-three/drei'

export default function Video() {

  return (
    <>
      <Canvas>
        <Vid />
      </Canvas>
      <GoNext />
    </>
  );

}

const Vid = () => {


  const size = useAspect(1800, 1000)
  const [video] = useState(() =>
    Object.assign(document.createElement('video'), { src: '/test.mp4', crossOrigin: 'Anonymous', loop: false, muted: true }),
  )
  useEffect(() => void video.play(), [video])

  console.log(video);
  return (

    <>

      <mesh scale={size}>
        <planeBufferGeometry />
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>

    </>

  )
}


const GoNext = () => {

  return (
    <>
      <div className="end-scene__pos">
        <a href="/" className="end-scene__button">
          go next!
        </a>
      </div>
    </>
  )
}




