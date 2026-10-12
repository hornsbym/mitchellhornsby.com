'use client'
import { useFrame } from "@react-three/fiber"
import React, { useMemo } from "react"
import * as THREE from "three";
import { EmojiCoinRelief, createEmojiCoinGeometry, createEmojiCoinPoints } from "../geometries/emojiCoin";
import { emojiCoins } from "../geometries/emojis";

type EmojiCoinProps = {
    name: string
    /** Colour of the points */
    color: string
    /** Size of each point */
    size: number
    /** Overall size; the emoji is about 2.2 units across at a scale of 1 */
    scale?: number
    /** When true, the intro plays in reverse: the gold fades back into points, then they fly off */
    leaving?: boolean
    /** Called once the exit has finished and nothing is left on screen */
    onExited?: () => void
    /**
     * Extra spin speed, as a multiple of the normal speed, that eases back to 0 on its own.
     * Whoever owns it can add to it at any time, e.g. while the page scrolls.
     */
    spinBoost?: React.MutableRefObject<number>
}

/** Whether detail lines stand up from the faces or are cut into them */
const relief: EmojiCoinRelief = 'engraved'

// Intro timing, in seconds; the exit plays the same timeline backwards
/** Longest wait before a point starts flying in, so they arrive staggered */
const maxFlightDelay = 0.8
/** How long each point takes to fly from off-screen into place */
const flightDuration = 1.4
/** When the solid coin starts fading in and the points start fading out, overlapping their landing */
const fadeStart = 1.1
const fadeDuration = 1.4
const flightEnd = maxFlightDelay + flightDuration
export const introDuration = Math.max(flightEnd, fadeStart + fadeDuration)

/** Idle spin speed, in radians per second (0.2 is one full turn about every 31 seconds) */
const spinSpeed = 0.2
/** How quickly a spin boost fades; it halves roughly every 0.7 / spinBoostDecay seconds */
const spinBoostDecay = 1.5

/** Opacity of the finished coin */
const surfaceOpacity = 1

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

const EmojiCoin = ({
    name,
    color,
    size,
    scale = 2,
    leaving = false,
    onExited,
    spinBoost
}: EmojiCoinProps) => {
    const { shape, tilt = 0 } = emojiCoins[name]
    const coinGeometry = useMemo(() => createEmojiCoinGeometry(shape, { relief }), [shape])
    const pointsGeometry = useMemo(() => createEmojiCoinPoints(shape), [shape])
    const coin = React.useRef<THREE.Group>(null);
    // Position along the intro timeline. It runs forward while entering and backward while
    // leaving, so switching partway through reverses smoothly from wherever it is.
    const timeline = React.useRef({ time: 0, lastFlightTime: -1 })
    // How far the coin has turned, in radians; advances faster while boosted
    const spinAngle = React.useRef(0)

    // Each point flies in from a random spot well outside the view, in front of the camera
    const flight = useMemo(() => {
        const positions = pointsGeometry.attributes.position as THREE.BufferAttribute
        const targets = Float32Array.from(positions.array)
        const starts = new Float32Array(targets.length)
        const delays = new Float32Array(positions.count)
        for (let i = 0; i < positions.count; i++) {
            const angle = Math.random() * Math.PI * 2
            const distance = 6 + Math.random() * 4
            starts[i * 3] = Math.cos(angle) * distance
            starts[i * 3 + 1] = Math.sin(angle) * distance
            starts[i * 3 + 2] = -3 + Math.random() * 4
            delays[i] = Math.random() * maxFlightDelay
        }
        // The geometry is left untouched here; the first frame moves every point to its start
        return { positions, targets, starts, delays }
    }, [pointsGeometry])

    const pointsMaterial = useMemo(() => {
        const material = new THREE.PointsMaterial({ size, transparent: true, depthWrite: false })
        // Points draw as squares by default; trim each to a circle with a soft edge
        material.onBeforeCompile = shader => {
            shader.fragmentShader = shader.fragmentShader.replace('#include <alphatest_fragment>', /* glsl */ `
                #include <alphatest_fragment>
                float dotRadius = length(gl_PointCoord - 0.5);
                if (dotRadius > 0.5) discard;
                diffuseColor.a *= 1.0 - smoothstep(0.4, 0.5, dotRadius);
            `)
        }
        return material
    }, [size])
    // The coin is drawn twice, inside faces then outside faces, so the translucent gold
    // layers correctly: the far side always shows through the near side
    const [insideMaterial, outsideMaterial] = useMemo(() => [THREE.BackSide, THREE.FrontSide].map(side =>
        new THREE.MeshPhongMaterial({
            color: '#d4a017',
            specular: '#fff2b3',
            shininess: 60,
            transparent: true,
            opacity: 0,
            side,
            depthWrite: false,
        })
    ), [])

    useFrame((_, delta) => {
        const previousTime = timeline.current.time
        const time = THREE.MathUtils.clamp(previousTime + (leaving ? -delta : delta), 0, introDuration)
        timeline.current.time = time
        if (leaving && previousTime > 0 && time === 0) {
            onExited?.()
        }

        // Move the points only while some are still in flight
        const flightTime = Math.min(time, flightEnd)
        if (flightTime !== timeline.current.lastFlightTime) {
            timeline.current.lastFlightTime = flightTime
            const { positions, targets, starts, delays } = flight
            const array = positions.array as Float32Array
            for (let i = 0; i < positions.count; i++) {
                const t = easeOutCubic(THREE.MathUtils.clamp((flightTime - delays[i]) / flightDuration, 0, 1))
                for (let axis = 0; axis < 3; axis++) {
                    const k = i * 3 + axis
                    array[k] = starts[k] + (targets[k] - starts[k]) * t
                }
            }
            positions.needsUpdate = true
        }

        // Cross-fade: the solid coin materializes as the points fade away
        const fade = THREE.MathUtils.clamp((time - fadeStart) / fadeDuration, 0, 1)
        insideMaterial.opacity = surfaceOpacity * fade
        outsideMaterial.opacity = surfaceOpacity * fade
        // Once fully faded in, draw it as an ordinary solid: depth-tested so the near side always
        // covers the far side, with no need for the inside pass that translucency relies on
        const solid = fade === 1 && surfaceOpacity === 1
        if (outsideMaterial.transparent === solid) {
            outsideMaterial.transparent = !solid
            outsideMaterial.depthWrite = solid
            outsideMaterial.needsUpdate = true
            insideMaterial.visible = !solid
        }
        pointsMaterial.opacity = 1 - fade
        pointsMaterial.color.set(color)

        // Steady spin in one direction around the vertical axis, so the coin turns to show its edge.
        // Any boost speeds it up, then fades away smoothly.
        spinAngle.current += delta * spinSpeed * (1 + (spinBoost?.current ?? 0))
        if (spinBoost) {
            spinBoost.current *= Math.exp(-delta * spinBoostDecay)
        }
        if (coin.current) {
            coin.current.rotation.y = -spinAngle.current;
        }
    });

    return (
        <group scale={scale}>
            {/* The tilt turns the emoji in its own plane; the spin only drives rotation.y */}
            <group ref={coin} rotation={[0, 0, tilt]}>
                <mesh geometry={coinGeometry} material={insideMaterial} renderOrder={0} />
                <mesh geometry={coinGeometry} material={outsideMaterial} renderOrder={1} />
                {/* Not culled, since the points start outside the coin's final bounds */}
                <points geometry={pointsGeometry} material={pointsMaterial} renderOrder={2} frustumCulled={false} />
            </group>
        </group>
    )
}

export default EmojiCoin
