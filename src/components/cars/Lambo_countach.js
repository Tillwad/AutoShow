import { useMemo } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import * as THREE from 'three'
import UserStore from '../stores/UserStore'

export function Lambo_Old(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/lambo_countach_old.glb')
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
        nodes.carcase_carcase_texture_0.material = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            metalness: 0.05,
            color: UserStore.colors.split(',')[1],
            envMapIntensity: 0.75,
            clearcoatRoughness: 0,
            clearcoat: 1
          })
        nodes.glass_glass_texture_0.material = new THREE.MeshPhysicalMaterial({
            opacity: 1,
            color: 'black',
            depthWrite: true,
            roughness: 0,
            sheenColor: 'white'
          })

          applyProps(materials['wheels_texture.001'], {
            
          } )
    }, [nodes, materials])

    useFrame(() => {
        nodes.carcase_carcase_texture_0.material = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            metalness: 0.05,
            color: UserStore.colors.split(',')[1],
            envMapIntensity: 0.75,
            clearcoatRoughness: 0,
            clearcoat: 1
          })
    })
    return <a.primitive object={scene} {...props} />
}