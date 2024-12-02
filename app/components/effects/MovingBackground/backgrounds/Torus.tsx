'use client'
import { useAnimations } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber"
import React, { useEffect } from "react"
import * as THREE from "three";


type SphereBackgroundProps = {
    classNames?: ClassOverrides
}

type ClassOverrides = {
    container?: string
}

/**
 * Randomly spawns and manages moving shapes in the background
 * @returns 
 */
export default function TorusBg({
    classNames = {}
}: SphereBackgroundProps) {
    return (
        <div className="relative top-0 right-0 bottom-0 left-0 h-screen w-screen">
            {/* Light mode */}
            <div className="visible dark:invisible absolute w-full h-full">
                <Canvas>
                    <ambientLight intensity={0.1} />
                    <Torus color={'#dd8800'} size={0.025} />
                </Canvas>
            </div>
            {/* Dark mode */}
            <div className="invisible dark:visible absolute w-full h-full">
                <Canvas>
                    <ambientLight intensity={0.1} />
                    <Torus color={'#ff9900'} size={0.02} />
                </Canvas>
            </div>
        </div>
    )
}

type TorusProps = {
    color: string
    size: number
}


const Torus = ({
    color,
    size
}: TorusProps) => {
    const torusGeometry = new THREE.TorusGeometry()
    const torusMesh = React.useRef();
    const startingQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 0), 0);
    const middleQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 7 * Math.PI / 6);
    const endingQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    const torusIntroScaleKeyframes = new THREE.VectorKeyframeTrack(
        '.scale',
        [0, 1.25],
        [0, 0, 0, 3.5, 3.5, 3.5],
        THREE.InterpolateSmooth
    )
    const torusIntroRotKeyframes = new THREE.QuaternionKeyframeTrack(
        '.quaternion',
        [0, .33, 1.25],
        [
            startingQuaternion.x, startingQuaternion.y, startingQuaternion.z, startingQuaternion.w,
            middleQuaternion.x, middleQuaternion.y, middleQuaternion.z, middleQuaternion.w,
            endingQuaternion.x, endingQuaternion.y, endingQuaternion.z, endingQuaternion.w
        ],
        THREE.InterpolateSmooth
    )
    const torusIntroAnimationClip = new THREE.AnimationClip(
        'torus-intro',
        1.25,
        [torusIntroScaleKeyframes, torusIntroRotKeyframes],
    )

    const { ref, actions, names } = useAnimations([torusIntroAnimationClip])

    // Change animation when the index changes
    useEffect(() => {
        const scaleAnimation = actions[names[0]]
        if (scaleAnimation !== null) {
            scaleAnimation.clampWhenFinished = true
            scaleAnimation.reset()
            scaleAnimation.setLoop(THREE.LoopOnce, 1)
            scaleAnimation.play()
        }
    }, [actions, names])

    useFrame(({ clock }) => {
        const a = Math.sin(clock.getElapsedTime() / 30) * 3;
        if (torusMesh.current) {
            //@ts-expect-error
            torusMesh.current.rotation.z = -a;
        }
    });

    return (
        // @ts-expect-error
        <group ref={ref} position={[0, -.25, 0]}>
            <mesh
                // @ts-expect-error
                ref={torusMesh}
            >
                <points
                    geometry={torusGeometry}
                >
                    <meshStandardMaterial />
                    <pointsMaterial color={color} size={size} />
                </points>
            </mesh>
        </group>

    )
}
