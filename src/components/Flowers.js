/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Anskar (https://sketchfab.com/Anskar)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-flowers-857802babfd542e094e8ef2c396be360
title: Low Poly Flowers
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/flowers/scene.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[19.36, 21.39, 11.67]} scale={100}>
            <mesh geometry={nodes.Circle001_Material001_0.geometry} material={nodes.Circle001_Material001_0.material} />
          </group>
          <group position={[-12.33, 25.21, 6.35]} scale={100}>
            <mesh geometry={nodes.Circle006_Circle007_Material001_0.geometry} material={nodes.Circle006_Circle007_Material001_0.material} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/flowers/scene.gltf')
