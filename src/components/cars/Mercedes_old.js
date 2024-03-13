import { useMemo } from 'react'
import { applyProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import UserStore from '../stores/UserStore'

export function Mercedes_Old(props) {
    const { scene, nodes, materials } = useGLTF('/models/cars/mercedes_300_sl.glb')
    useMemo(() => {
        Object.values(nodes).forEach((node) => {
            node.isMesh && (node.receiveShadow = node.castShadow = true)
        })
        // Windows: 004
        applyProps(materials['main_color'], { color: UserStore.colors.split(',')[7]})
        console.log(materials)
    }, [nodes, materials])

    useFrame(() => {
        applyProps(materials['main_color'], { color: UserStore.colors.split(',')[7]})
    })
    return <a.primitive object={scene} {...props} />
}