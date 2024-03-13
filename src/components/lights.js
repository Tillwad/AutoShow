import React from "react"

export function Lights(props) {
    const lights = [[[216 / 255, 160 / 255, 22 / 255], [159 / 255, 107 / 255, 8 / 255]], [[177 / 255, 43 / 255, 40 / 255], [198 / 255, 150 / 255, 50 / 255]], [[0.14, 0.5, 1], [111 / 255, 111 / 255, 111 / 255]], [[164 / 255, 170 / 255, 174 / 255], [1, 0.25, 0.7]]]
    return (
        <>
            <spotLight
                color={lights[props.count][0]}
                intensity={1.5}
                angle={0.8}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
            <spotLight
                color={lights[props.count][1]}
                intensity={2}
                angle={0.8}
                penumbra={0.5}
                position={[-5, 5, 0]}
                castShadow
                shadow-bias={-0.0001}
            />
        </>
    )
}

