import { useMemo} from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import * as THREE from 'three'
import UserStore from '../stores/UserStore'

export function Mercedes(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/mercedes.glb')
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
        // applyProps(materials.LIGHT, { emissiveIntensity: 3, emissive: 'white', toneMapped: false, depthWrite: true, metalness: 0, opacity: 1, roughness: 0.82, transparent: false })
        // applyProps(materials.HEADLIGHT_GLASS, { opacity: 0.4, transparent: true })
        // applyProps(materials.WINDOW, { color: 'black' })
        // applyProps(materials.SCREEN, { emissiveIntensity: 3, emissive: 'red', toneMapped: false, depthWrite: true, metalness: 0, opacity: 1, roughness: 0.82, transparent: false  })
        // applyProps(materials.CLUSTER, { opacity: 0.4, transparent: true })
    }, [nodes, materials])

    useFrame(() => {
        nodes.Paint.material = new THREE.MeshPhysicalMaterial({
          roughness: 0.3,
          metalness: 0.05,
          color: UserStore.colors.split(',')[6],
          envMapIntensity: 0.75,
          clearcoatRoughness: 0,
          clearcoat: 1
        })

        nodes.DoorLF_Paint.material = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            metalness: 0.05,
            color: UserStore.colors.split(',')[6],
            envMapIntensity: 0.75,
            clearcoatRoughness: 0,
            clearcoat: 1
          })

          nodes.DoorRF_Paint.material = new THREE.MeshPhysicalMaterial({
            roughness: 0.3,
            metalness: 0.05,
            color: UserStore.colors.split(',')[6],
            envMapIntensity: 0.75,
            clearcoatRoughness: 0,
            clearcoat: 1
          })
      })

    return <a.primitive object={scene} {...props} />
}