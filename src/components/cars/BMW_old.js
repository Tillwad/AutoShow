import { useMemo } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import * as THREE from 'three'
import UserStore from '../stores/UserStore'

export function BMW_Old(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/bmw_g80_1.glb')
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
    }, [nodes, materials])
    return <a.primitive object={scene} {...props} />
}