import * as THREE from "three"

const noiseFunctions = /* glsl */ `
uniform float uDissolve;
varying vec3 vDissolvePosition;

float dissolveHash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

// Smooth 3D value noise in the range 0 to 1
float dissolveValueNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(
            mix(dissolveHash(i), dissolveHash(i + vec3(1, 0, 0)), f.x),
            mix(dissolveHash(i + vec3(0, 1, 0)), dissolveHash(i + vec3(1, 1, 0)), f.x),
            f.y
        ),
        mix(
            mix(dissolveHash(i + vec3(0, 0, 1)), dissolveHash(i + vec3(1, 0, 1)), f.x),
            mix(dissolveHash(i + vec3(0, 1, 1)), dissolveHash(i + vec3(1, 1, 1)), f.x),
            f.y
        ),
        f.z
    );
}
`

/**
 * Makes a material appear in noisy patches with a glowing edge as `progress.value` goes from 0 to 1.
 * The noise follows the object's own coordinates, so the pattern moves with it as it spins.
 * Not currently used; kept for experimenting with the emoji's intro.
 */
export function addDissolve<T extends THREE.Material>(
    material: T,
    progress: { value: number },
    edgeColor = new THREE.Color('#ffd86b')
): T {
    const previousOnBeforeCompile = material.onBeforeCompile.bind(material)
    const previousCacheKey = material.customProgramCacheKey.bind(material)
    material.onBeforeCompile = (shader, renderer) => {
        previousOnBeforeCompile(shader, renderer)
        shader.uniforms.uDissolve = progress
        shader.uniforms.uDissolveEdgeColor = { value: edgeColor }
        shader.vertexShader = shader.vertexShader
            .replace('#include <common>', '#include <common>\nvarying vec3 vDissolvePosition;')
            .replace('#include <begin_vertex>', '#include <begin_vertex>\nvDissolvePosition = position;')
        shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', `#include <common>\nuniform vec3 uDissolveEdgeColor;\n${noiseFunctions}`)
            .replace('#include <dithering_fragment>', /* glsl */ `
                #include <dithering_fragment>
                float dissolveNoise = 0.65 * dissolveValueNoise(vDissolvePosition * 5.0)
                    + 0.35 * dissolveValueNoise(vDissolvePosition * 13.0);
                // Runs a little past 0 and 1 so the surface starts fully hidden and ends fully shown
                float dissolveThreshold = mix(-0.1, 1.1, uDissolve);
                if (dissolveNoise > dissolveThreshold) discard;
                float dissolveGlow = 1.0 - smoothstep(0.0, 0.06, dissolveThreshold - dissolveNoise);
                gl_FragColor.rgb = mix(gl_FragColor.rgb, uDissolveEdgeColor, dissolveGlow);
                gl_FragColor.a = max(gl_FragColor.a, dissolveGlow * 0.9);
            `)
    }
    material.customProgramCacheKey = () => `${previousCacheKey()}|dissolve`
    return material
}
