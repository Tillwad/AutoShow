import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { LinearEncoding, MeshNormalMaterial, RepeatWrapping, TextureLoader } from "three";
import { MeshReflectorMaterial, Text, useProgress } from "@react-three/drei";
import { useSpring, a, config } from '@react-spring/three'
import { BMW } from "./cars/BMW";
import { Lamborghini } from "./cars/Lamborghini";
import { Porsche } from "./cars/Porsche";
import { Mercedes } from "./cars/Mercedes";
import { BMW_Old } from "./cars/BMW_old";
import { Mercedes_Old } from "./cars/Mercedes_old";
import { Lambo_Old } from "./cars/Lambo_countach";
import { Porsche_930 } from "./cars/930";
import { useSnapshot } from "valtio";

export default function Plattform(props) {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/white_plaster_rough.jpg",
    process.env.PUBLIC_URL + "textures/white_plaster_nor.jpg",
  ]); 

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });
    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  const springs = useSpring({
    position: props.start ? [0, -4.74, 0] : [0, .26, 0],
    position1: props.start ? [0, -5, 0] : [0, 0, 0],
    rotation: props.start ? [-Math.PI * .5, 0, Math.PI * .5] : [-Math.PI * .5, 0, 0],
    rotation1: props.start ? [0, Math.PI * .5, 0] : [0, 0, 0],
    config: config.slow,
  })

  const snap = useSnapshot(props.state)

  const Car = () => {
    const Oldcars = [
      <Lambo_Old color={snap.items.Lambo} castShadow receiveShadow scale={1.515} rotation={[Math.PI * 2, 0, 0]} position={[0, 0.22, 0]} />,
      <Porsche_930 color={props.state} castShadow receiveShadow scale={1.75} rotation={[Math.PI * 2, 0, 0]} position={[1.8, 2.95, 0]} />,
      <BMW color={props.state} castShadow receiveShadow scale={.9} rotation={[Math.PI * 2, 0, 0]} position={[0, .24, 0]} />,
      <Mercedes_Old color={props.state} castShadow receiveShadow scale={2.25} rotation={[Math.PI * 2, 0, 0]} position={[0, -.9, -1.5]} />
    ]

    const Newcars = [
      // <Lamborghini color={color} castShadow receiveShadow scale={0.015} rotation={[Math.PI * 2, 0, 0]} position={[0, 1.38, 0]} />,
      <Lamborghini castShadow receiveShadow scale={0.015} rotation={[Math.PI * 2, 0, 0]} position={[0, 1.38, 0]} />,
      <Porsche castShadow receiveShadow scale={1.75} rotation={[Math.PI * 2, 0, 0]} position={[0, 1.31, 0]} />,
      <BMW_Old castShadow receiveShadow scale={1.9} rotation={[Math.PI * 2, 0, 0]} position={[0, .24, 0]} />,
      <Mercedes castShadow receiveShadow scale={1.5} rotation={[Math.PI * 2, 0, 0]} position={[0, .23, 0]} />
    ]

    if (props.start) {
      setTimeout(function () {
        props.setStart(false)
      }, 1000)
    }

    return (
      <>
        {props.old ? Oldcars[props.count] : Newcars[props.count]}
      </>)
  }

  const Loader = () => {
    const { progress } = useProgress()
    return <Text position={[0, 2, 0]}>{Math.round(progress)}% loaded</Text>
  }

  const Newbezeichnung = [
    [["Lamborghini"], ["Urus"]],
    [["Porsche"], ["911 Turbo"]],
    [["BMW"], ["M3 G80"]],
    [["Mercedes"], ["AMG GT"]],
  ]
  const Oldbezeichnung = [
    [["Lamborghini"], ["Countach"], ["1985"]],
    [["Porsche"], ["930 Turbo"], ["1975"]],
    [["BMW M3"], ["E30 Coupe"], ["1986"]],
    [["Mercedes"], ["300 SL"], ["1989"]],
  ]

  return <>
    <Suspense fallback={<Loader />}>
      <a.mesh castShadow receiveShadow rotation={springs.rotation1} position={springs.position1}>
        <cylinderGeometry args={[4.5, 4.5, .5, 30]} />
        <meshStandardMaterial attach={"material"} color="black" />
        <Car />
        <Text position={[-2.75, .261, 0]} rotation={[-Math.PI * .5, 0, -Math.PI * .5]} style={{ opacity: .5, color: 'red' }}>
          {props.old ? Oldbezeichnung[props.count][0] : Newbezeichnung[props.count][0]}
        </Text>
        <Text position={[2.75, .261, 0]} rotation={[-Math.PI * .5, 0, Math.PI * .5]} style={{ opacity: .5, color: 'red' }}>
          {props.old ? Oldbezeichnung[props.count][1] : Newbezeichnung[props.count][1]}
        </Text>
      </a.mesh>
    </Suspense>
    <a.mesh castShadow receiveShadow rotation={springs.rotation} position={springs.position}>
      <circleGeometry args={[4.5, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </a.mesh>

  </>
}