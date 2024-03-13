import { OrbitControls, PerspectiveCamera, useGLTF, Box, useProgress, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Ground from "./components/Ground"
import Plattform from "./components/Plattform";
import { Lights } from "./components/lights"
import { Suspense } from "react";

export default function CarShow(props) {

    const Loader = () => {
        const { progress } = useProgress();
        return <>
            <span class="loader"></span>
            <div className="Loader">
                {Math.round(progress)}% Loaded
            </div>

        </>
    }

    if (!props.old) {
        if (props.count === 0) props.state.current = "Lambo"
        if (props.count === 1) props.state.current = "Porsche"
        if (props.count === 2) props.state.current = "Bmw"
        if (props.count === 3) props.state.current = "Mercedes"
    }
    else {
        if (props.count === 0) props.state.current = "Lambo_old"
        if (props.count === 1) props.state.current = "Porsche_old"
        if (props.count === 2) props.state.current = "Bmw_old"
        if (props.count === 3) props.state.current = "Mercedes_old"
    }

    return (
        <>
            <Suspense fallback={<Loader />}>
                <Canvas shadows onWheel={(event) => props.onWheel(event)}>
                    {/* {useGLTF.preload('/models/cars/bmw_m3.glb')} */}
                    {/* {useGLTF.preload('/models/cars/911.glb')} */}
                    {useGLTF.preload('/models/cars/lambo.glb')}
                    {/* {useGLTF.preload('/models/cars/bmw_g80.glb')} */}
                    {/* {useGLTF.preload('/models/cars/mercedes.glb')} */}
                    {/* {useGLTF.preload('/models/cars/mercedes_300_sl.glb')} */}
                    {/* {useGLTF.preload('/textures/terrain-normal.jpg')} */}
                    {/* {useGLTF.preload('/textures/terrain-roughness.jpg')} */}
                    {/* {useGLTF.preload('/textures/white_plaster_nor.jpg')} */}
                    {/* {useGLTF.preload('/textures/white_plaster_rough.jpg')} */}

                    <PerspectiveCamera makeDefault fov={50} position={[0, 2, 10]} />
                    <OrbitControls
                        target={[0, 0.45, 0]}
                        maxPolarAngle={1.45}
                        enablePan={false}
                        // enableZoom={false}
                        autoRotate={true}
                    />
                    {/* light settings */}
                    <color args={[0, 0, 0]} attach="background" />
                    {/* <ambientLight intensity={1} /> */}
                    <Lights count={props.count} />
                    <Ground />
                    <Plattform start={props.start} setStart={(b) => props.setStart(b)} count={props.count} old={props.old} state={props.state} />
                </Canvas>
            </Suspense>
        </>
    )
}
