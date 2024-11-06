import { useLayoutEffect } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { a } from '@react-spring/three'
import { useGLTF } from '@react-three/drei'
import UserStore from '../stores/UserStore'
import * as THREE from 'three'
import { MaterialLoader } from 'three'

/*
Author: Karol Miklas (https://sketchfab.com/karolmiklas)
License: CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/)
Source: https://sketchfab.com/3d-models/free-porsche-911-carrera-4s-d01b254483794de3819786d93e0e1ebf
Title: (FREE) Porsche 911 Carrera 4S
*/

export function Porsche(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/911.glb')
    useLayoutEffect(() => {
        Object.values(nodes).forEach((node) => node.isMesh && (node.receiveShadow = node.castShadow = true))
        applyProps(materials.window, { color: 'black', opacity: 1, metalness: 0.75, roughness: 0 })
        applyProps(materials.lights, { emissiveIntensity: 3, emissive: 'white', toneMapped: false, depthWrite: true, metalness: 0, opacity: 1, roughness: 0.82, transparent: false })
        applyProps(materials.paint, { color: UserStore.colors.split(',')[2] })
    }, [nodes, materials])

    useFrame(() => {
        applyProps(materials.paint, { color: UserStore.colors.split(',')[2] })
    })
    return <a.primitive object={scene} {...props} />
}