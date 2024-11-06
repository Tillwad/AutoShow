import { useMemo } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import * as THREE from 'three'
import UserStore from '../stores/UserStore'

export function Porsche_930(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/Porsche_930.glb')
    useMemo(() => {
        Object.values(nodes).forEach((node) => {
            node.isMesh && (node.receiveShadow = node.castShadow = true)
            node.material = new THREE.MeshPhysicalMaterial({
                roughness: 0.3,
                metalness: 0.05,
                color: 'black',
                envMapIntensity: 0.75,
                clearcoatRoughness: 0,
                clearcoat: 1
            })
        })
        applyProps(materials.Rear_Lights, {
            emssive: 'red',
            emssiveIntensity: 3
        })

        applyProps(materials['Material.005'], { color: 'green' })
        console.log(nodes)
    }, [nodes, materials])

    useFrame(() => {
        nodes.Cube001_1.material = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            metalness: 0.05,
            color: UserStore.colors.split(',')[3],
            envMapIntensity: 0.75,
            clearcoatRoughness: 0,
            clearcoat: 1
        })
    })
    return <a.primitive object={scene} {...props} />
}