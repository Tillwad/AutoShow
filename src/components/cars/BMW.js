import { useMemo } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import UserStore from '../stores/UserStore'
import * as THREE from 'three'

export function BMW(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/bmw_m3.glb')
    useMemo(() => {
        Object.values(nodes).forEach((node) => {
            node.isMesh && (node.receiveShadow = node.castShadow = true)
        })
        applyProps(materials['Material.005'], {
            opacity: 1,
            color: 'black',
            depthWrite: true,
            roughness: 0,
            sheenColor: 'white',
        })
        //BreackDisc
        applyProps(materials['Material.042'], { color: 'darkred' })
        applyProps(materials.Front_Lights, { emissiveIntensity: 100 })

        applyProps(materials['Material.001'] ,{ color: UserStore.colors.split(',')[5]})
    }, [nodes, materials])

    useFrame(() => {
        applyProps(materials['Material.001'] ,{ color: UserStore.colors.split(',')[5]})
    })

    return <a.primitive object={scene} {...props} />
}