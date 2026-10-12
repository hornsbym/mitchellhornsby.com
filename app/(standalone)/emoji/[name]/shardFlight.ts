import * as THREE from "three"

/**
 * Splits a geometry into separate triangles ("shards") and gives each one a random off-screen
 * starting point, a random start delay and a random tumble, for use with `addShardFlight`.
 */
export function prepareShards(geometry: THREE.BufferGeometry, maxDelay: number): THREE.BufferGeometry {
    const shards = geometry.index ? geometry.toNonIndexed() : geometry.clone()
    const positions = shards.attributes.position
    const centroids = new Float32Array(positions.count * 3)
    const offsets = new Float32Array(positions.count * 3)
    const tumbleAxes = new Float32Array(positions.count * 3)
    const tumbleAngles = new Float32Array(positions.count)
    const delays = new Float32Array(positions.count)

    const centroid = new THREE.Vector3()
    const vertex = new THREE.Vector3()
    const axis = new THREE.Vector3()
    for (let triangle = 0; triangle < positions.count; triangle += 3) {
        centroid.set(0, 0, 0)
        for (let corner = 0; corner < 3; corner++) {
            centroid.add(vertex.fromBufferAttribute(positions, triangle + corner))
        }
        centroid.divideScalar(3)

        // Start well outside the view, in front of the camera
        const angle = Math.random() * Math.PI * 2
        const distance = 6 + Math.random() * 4
        const start = new THREE.Vector3(Math.cos(angle) * distance, Math.sin(angle) * distance, -3 + Math.random() * 4)
        const offset = start.sub(centroid)
        axis.randomDirection()
        const tumbleAngle = Math.PI + Math.random() * Math.PI * 2
        const delay = Math.random() * maxDelay

        for (let corner = 0; corner < 3; corner++) {
            const i = triangle + corner
            centroid.toArray(centroids, i * 3)
            offset.toArray(offsets, i * 3)
            axis.toArray(tumbleAxes, i * 3)
            tumbleAngles[i] = tumbleAngle
            delays[i] = delay
        }
    }

    shards.setAttribute('aCentroid', new THREE.BufferAttribute(centroids, 3))
    shards.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3))
    shards.setAttribute('aTumbleAxis', new THREE.BufferAttribute(tumbleAxes, 3))
    shards.setAttribute('aTumbleAngle', new THREE.BufferAttribute(tumbleAngles, 1))
    shards.setAttribute('aDelay', new THREE.BufferAttribute(delays, 1))
    return shards
}

const shardFunctions = /* glsl */ `
uniform float uIntroTime;
uniform float uFlightDuration;
uniform float uFadeInDistance;
attribute vec3 aCentroid;
attribute vec3 aOffset;
attribute vec3 aTumbleAxis;
attribute float aTumbleAngle;
attribute float aDelay;
varying float vShardOpacity;

// How much of this shard's flight is left, eased so it slows as it lands
float shardRemaining() {
    float t = clamp((uIntroTime - aDelay) / uFlightDuration, 0.0, 1.0);
    return pow(1.0 - t, 3.0);
}

// Rotates around the shard's tumble axis (Rodrigues' rotation formula)
vec3 shardTumble(vec3 v, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return v * c + cross(aTumbleAxis, v) * s + aTumbleAxis * dot(aTumbleAxis, v) * (1.0 - c);
}
`

/**
 * Makes a material fly each shard from its starting point into place, tumbling as it goes.
 * Shards are fully transparent while apart and fade in over the last `fadeInDistance` of their
 * flight (as a fraction of the whole distance), so the shape materializes as it assembles.
 * Every shard has landed once `introTime.value` reaches its delay plus `flightDuration`.
 * The geometry must come from `prepareShards`.
 */
export function addShardFlight<T extends THREE.Material>(
    material: T,
    introTime: { value: number },
    flightDuration: number,
    fadeInDistance = 0.3
): T {
    const previousOnBeforeCompile = material.onBeforeCompile.bind(material)
    const previousCacheKey = material.customProgramCacheKey.bind(material)
    material.onBeforeCompile = (shader, renderer) => {
        previousOnBeforeCompile(shader, renderer)
        shader.uniforms.uIntroTime = introTime
        shader.uniforms.uFlightDuration = { value: flightDuration }
        shader.uniforms.uFadeInDistance = { value: fadeInDistance }
        shader.vertexShader = shader.vertexShader
            .replace('#include <common>', `#include <common>\n${shardFunctions}`)
            .replace('#include <beginnormal_vertex>', /* glsl */ `
                #include <beginnormal_vertex>
                objectNormal = shardTumble(objectNormal, shardRemaining() * aTumbleAngle);
            `)
            .replace('#include <begin_vertex>', /* glsl */ `
                #include <begin_vertex>
                float remaining = shardRemaining();
                transformed = aCentroid + shardTumble(position - aCentroid, remaining * aTumbleAngle) + aOffset * remaining;
                vShardOpacity = 1.0 - smoothstep(0.0, uFadeInDistance, remaining);
            `)
        shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', '#include <common>\nvarying float vShardOpacity;')
            .replace('#include <dithering_fragment>', '#include <dithering_fragment>\ngl_FragColor.a *= vShardOpacity;')
    }
    material.customProgramCacheKey = () => `${previousCacheKey()}|shardFlight`
    return material
}
