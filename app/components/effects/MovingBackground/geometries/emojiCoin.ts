import * as THREE from "three"
import polygonClipping from "polygon-clipping"

export type Point2 = [number, number]

/**
 * A flat drawing of an emoji, centred roughly on the origin and about 2 units across
 */
export type EmojiCoinShape = {
    /** Closed silhouette of the emoji; becomes the coin's rim */
    outline: Point2[]
    /**
     * Further closed loops that also get a rim. Loops wound the same way as `outline` are separate
     * pieces; loops wound the opposite way are holes cut through the main piece.
     */
    extraOutlines?: Point2[][]
    /** Lines raised as ridges on both faces (repeat the first point to close one) */
    details: Point2[][]
    /** Like `details`, but with wider, taller ridges */
    boldDetails?: Point2[][]
}

export type EmojiCoinRelief = 'raised' | 'engraved'

type EmojiCoinOptions = {
    /** Distance between the two faces of the coin */
    thickness?: number
    /** Approximate length of each segment along the rim, and between points */
    segmentLength?: number
    /** Whether detail lines stand up from the faces as ridges or are cut into them as grooves */
    relief?: EmojiCoinRelief
}

type Vector3Tuple = [number, number, number]

/** Width and height (or depth, when engraved) of the lines made from `details` and `boldDetails` */
const reliefSizes = {
    regular: { width: 0.035, height: 0.025 },
    bold: { width: 0.055, height: 0.04 },
}
/** Width of a ridge's flat top, as a fraction of its base */
const ridgeTopFraction = 0.3
/** Faces are slightly smaller than the rim so the edge reads as a rounded ridge */
const faceScale = 0.93

/**
 * The rim's outlines and cross-section, shared by the solid geometry and the points
 */
function coinProfile({ outline, extraOutlines = [] }: EmojiCoinShape, thickness: number, segmentLength: number) {
    const halfThickness = thickness / 2

    // Make every outline run counter-clockwise from the front, keeping holes opposite to pieces,
    // so the rim's triangles all face out of the solid
    const flip = THREE.ShapeUtils.isClockWise(toVectors(outline))
    const loops = [outline, ...extraOutlines].map(loop => resample(flip ? [...loop].reverse() : loop, segmentLength, true))

    // Each outline is swept around a half-circle profile between the faces
    const rimRingCount = Math.max(3, Math.round((Math.PI * halfThickness) / segmentLength))
    const rimRings = Array.from({ length: rimRingCount + 1 }, (_, r) => {
        const theta = -Math.PI / 2 + (r / rimRingCount) * Math.PI
        return {
            z: halfThickness * Math.sin(theta),
            scale: 1 - (1 - faceScale) * (1 - Math.cos(theta)),
        }
    })
    return { halfThickness, loops, rimRings }
}

const toVectors = (loop: Point2[]) => loop.map(([x, y]) => new THREE.Vector2(x, y))

/**
 * Builds a point cloud of the coin: rings of points around the rim, and points along every
 * detail line on both faces. Meant to be rendered with `<points>`.
 */
export function createEmojiCoinPoints(
    shape: EmojiCoinShape,
    { thickness = 0.24, segmentLength = 0.035 }: EmojiCoinOptions = {}
): THREE.BufferGeometry {
    const { halfThickness, loops, rimRings } = coinProfile(shape, thickness, segmentLength)
    const positions: number[] = []
    rimRings.forEach(({ z, scale }) =>
        loops.forEach(loop => loop.forEach(([x, y]) => positions.push(x * scale, y * scale, z)))
    )
    const lines = [...shape.details, ...(shape.boldDetails ?? [])].flatMap(line => resample(line, segmentLength))
    for (const face of [-1, 1]) {
        lines.forEach(([x, y]) => positions.push(x * faceScale, y * faceScale, face * halfThickness))
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.computeBoundingSphere()
    return geometry
}

/**
 * Builds the solid geometry of an emoji pressed into a coin.
 * The emoji lies in the XY plane; both wide faces (facing +Z and -Z) carry its details as raised
 * ridges or engraved grooves, and a thin rounded rim follows the outline between them.
 */
export function createEmojiCoinGeometry(
    shape: EmojiCoinShape,
    { thickness = 0.24, segmentLength = 0.035, relief = 'raised' }: EmojiCoinOptions = {}
): THREE.BufferGeometry {
    const { details, boldDetails = [] } = shape
    const { halfThickness, loops, rimRings } = coinProfile(shape, thickness, segmentLength)
    const positions: number[] = []
    const indices: number[] = []

    const addVertex = (vertex: Vector3Tuple) => positions.push(...vertex) / 3 - 1
    // Adds a quad (corners in order around its edge), flipped if needed so it faces `outward`
    const addQuad = (corners: Vector3Tuple[], outward: Vector3Tuple) => {
        const [a, b, c, d] = corners.map(addVertex)
        const [p, q, r] = corners.map(corner => new THREE.Vector3(...corner))
        const normal = q.clone().sub(p).cross(r.clone().sub(p))
        indices.push(...(normal.dot(new THREE.Vector3(...outward)) >= 0 ? [a, b, c, a, c, d] : [a, c, b, a, d, c]))
    }
    // Adds a triangle, flipped if needed so it faces `outward`
    const addTriangle = (corners: Vector3Tuple[], outward: Vector3Tuple) => {
        const [a, b, c] = corners.map(addVertex)
        const [p, q, r] = corners.map(corner => new THREE.Vector3(...corner))
        const normal = q.clone().sub(p).cross(r.clone().sub(p))
        indices.push(...(normal.dot(new THREE.Vector3(...outward)) >= 0 ? [a, b, c] : [a, c, b]))
    }

    // Rim: the rings of each outline joined into bands
    loops.forEach(loop => {
        const start = positions.length / 3
        const n = loop.length
        rimRings.forEach(({ z, scale }) => loop.forEach(([x, y]) => addVertex([x * scale, y * scale, z])))
        for (let r = 0; r < rimRings.length - 1; r++) {
            for (let i = 0; i < n; i++) {
                const a = start + r * n + i
                const b = start + r * n + (i + 1) % n
                const c = start + (r + 1) * n + (i + 1) % n
                const d = start + (r + 1) * n + i
                indices.push(a, b, c, a, c, d)
            }
        }
    })

    const reliefLines = [
        ...details.map(line => ({ line, ...reliefSizes.regular })),
        ...boldDetails.map(line => ({ line, ...reliefSizes.bold })),
    ].map(({ line, ...size }) => {
        const scaledLine = line.map(([x, y]): Point2 => [x * faceScale, y * faceScale])
        return { ...size, scaledLine, strip: offsetLine(scaledLine, size.width / 2) }
    })

    // Faces: holes are cut from the main outline; other pieces are filled on their own.
    // When engraved, the grooves' footprints are cut out too, merged first so crossings work.
    const holes = loops.slice(1).filter(loop => THREE.ShapeUtils.isClockWise(toVectors(loop)))
    const pieces = loops.filter(loop => !holes.includes(loop))
    const scaleLoop = (loop: Point2[]) => loop.map(([x, y]): Point2 => [x * faceScale, y * faceScale])
    const grooveSegments = relief === 'engraved'
        ? reliefLines.flatMap(({ strip }) => strip.segments.map(([i, j]): Point2[][] =>
            [[strip.left[i], strip.left[j], strip.right[j], strip.right[i]]]
        ))
        : []
    const grooveFootprints = grooveSegments.length ? polygonClipping.union(grooveSegments[0], ...grooveSegments.slice(1)) : []
    const faceRegions = pieces.flatMap(piece => {
        const region = [piece, ...(piece === loops[0] ? holes : [])].map(scaleLoop)
        return grooveFootprints.length ? polygonClipping.difference(region, grooveFootprints) : [region]
    })
    faceRegions.forEach(([outer, ...regionHoles]) => {
        // Clipping returns closed rings that repeat their first point; triangulation wants them open
        const open = (ring: Point2[]) => ring.length > 1 && ring[0][0] === ring.at(-1)![0] && ring[0][1] === ring.at(-1)![1]
            ? ring.slice(0, -1)
            : ring
        const rings = [outer, ...regionHoles].map(open)
        const triangles = THREE.ShapeUtils.triangulateShape(toVectors(rings[0]), rings.slice(1).map(toVectors))
        const faceVertices = rings.flat()
        for (const face of [-1, 1]) {
            const corners = faceVertices.map(([x, y]): Vector3Tuple => [x, y, face * halfThickness])
            const start = positions.length / 3
            corners.forEach(addVertex)
            triangles.forEach(([a, b, c]) => {
                const [p, q, r] = [a, b, c].map(index => corners[index])
                const facingZ = (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
                indices.push(...(Math.sign(facingZ) === face ? [a, b, c] : [a, c, b]).map(index => start + index))
            })
        }
    })

    // Grooves: V-shaped channels whose sloped walls meet along the line, so they catch the light face-on
    if (relief === 'engraved') {
        reliefLines.forEach(({ height: depth, strip }) => {
            for (const face of [-1, 1]) {
                const surfaceZ = face * halfThickness
                const bottomZ = face * (halfThickness - depth)
                const at = ([x, y]: Point2, z: number): Vector3Tuple => [x, y, z]
                strip.segments.forEach(([i, j]) => {
                    const side = strip.sideNormals[i]
                    // Each wall faces up out of the coin and across toward the other wall
                    addQuad([at(strip.left[i], surfaceZ), at(strip.left[j], surfaceZ), at(strip.points[j], bottomZ), at(strip.points[i], bottomZ)], [-side[0], -side[1], face])
                    addQuad([at(strip.right[i], surfaceZ), at(strip.right[j], surfaceZ), at(strip.points[j], bottomZ), at(strip.points[i], bottomZ)], [side[0], side[1], face])
                })
                // Close off the two ends of an open line, facing back along the groove
                strip.ends.forEach(({ index, direction }) => addTriangle(
                    [at(strip.left[index], surfaceZ), at(strip.right[index], surfaceZ), at(strip.points[index], bottomZ)],
                    [-direction[0], -direction[1], 0]
                ))
            }
        })
    }

    // Ridges: each detail line becomes a raised strip on both faces
    if (relief === 'raised') reliefLines.forEach(({ scaledLine, width, height, strip: base }) => {
        // The top is narrower than the base, so the sloped sides catch the light even face-on
        const top = offsetLine(scaledLine, width * ridgeTopFraction / 2)
        for (const face of [-1, 1]) {
            // The base sits just under the face so no seam shows where they meet
            const baseZ = face * (halfThickness - 0.005)
            const topZ = face * (halfThickness + height)
            const at = ([x, y]: Point2, z: number): Vector3Tuple => [x, y, z]
            base.segments.forEach(([i, j]) => {
                const side = base.sideNormals[i]
                addQuad([at(top.left[i], topZ), at(top.right[i], topZ), at(top.right[j], topZ), at(top.left[j], topZ)], [0, 0, face])
                addQuad([at(base.left[i], baseZ), at(top.left[i], topZ), at(top.left[j], topZ), at(base.left[j], baseZ)], [side[0], side[1], 0])
                addQuad([at(base.right[i], baseZ), at(top.right[i], topZ), at(top.right[j], topZ), at(base.right[j], baseZ)], [-side[0], -side[1], 0])
            })
            // Close off the two ends of an open line
            base.ends.forEach(({ index, direction }) => addQuad(
                [at(base.left[index], baseZ), at(top.left[index], topZ), at(top.right[index], topZ), at(base.right[index], baseZ)],
                [direction[0], direction[1], 0]
            ))
        }
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    geometry.computeBoundingSphere()
    return geometry
}

/**
 * Offsets a line to both sides, joining corners with mitred edges.
 * A line whose last point repeats its first is treated as a closed loop.
 */
function offsetLine(line: Point2[], halfWidth: number) {
    const closed = line.length > 2 && line[0][0] === line.at(-1)![0] && line[0][1] === line.at(-1)![1]
    const points = (closed ? line.slice(0, -1) : line)
        .filter((point, i, all) => i === 0 || point[0] !== all[i - 1][0] || point[1] !== all[i - 1][1])
    const n = points.length
    const direction = (from: Point2, to: Point2): Point2 => {
        const length = Math.hypot(to[0] - from[0], to[1] - from[1])
        return [(to[0] - from[0]) / length, (to[1] - from[1]) / length]
    }
    const leftOf = ([x, y]: Point2): Point2 => [-y, x]

    const left: Point2[] = []
    const right: Point2[] = []
    const sideNormals: Point2[] = []
    points.forEach((point, i) => {
        const previous = closed || i > 0 ? points[(i - 1 + n) % n] : undefined
        const next = closed || i < n - 1 ? points[(i + 1) % n] : undefined
        const incoming = previous && direction(previous, point)
        const outgoing = next && direction(point, next)
        const segmentNormal = leftOf((outgoing ?? incoming)!)
        let miter = segmentNormal
        let miterLength = 1
        if (incoming && outgoing) {
            const sum: Point2 = [incoming[0] + outgoing[0], incoming[1] + outgoing[1]]
            const sumLength = Math.hypot(...sum) || 1
            miter = leftOf([sum[0] / sumLength, sum[1] / sumLength])
            // Longer offsets keep the strip's width through a corner; capped so sharp turns don't spike
            miterLength = Math.min(2.5, 1 / Math.max(0.01, miter[0] * segmentNormal[0] + miter[1] * segmentNormal[1]))
        }
        const offset = halfWidth * miterLength
        left.push([point[0] + miter[0] * offset, point[1] + miter[1] * offset])
        right.push([point[0] - miter[0] * offset, point[1] - miter[1] * offset])
        sideNormals.push(segmentNormal)
    })

    const segmentCount = closed ? n : n - 1
    const segments = Array.from({ length: segmentCount }, (_, i): [number, number] => [i, (i + 1) % n])
    const ends = closed ? [] : [
        { index: 0, direction: direction(points[1], points[0]) },
        { index: n - 1, direction: direction(points[n - 2], points[n - 1]) },
    ]
    return { points, left, right, sideNormals, segments, ends }
}

/**
 * Points along a circular arc, with angles in radians
 */
export function arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, steps = 48): Point2[] {
    return Array.from({ length: steps + 1 }, (_, i): Point2 => {
        const angle = startAngle + (i / steps) * (endAngle - startAngle)
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
    })
}

/**
 * Re-samples a polyline so its points are evenly spaced along its length
 */
function resample(points: Point2[], spacing: number, closed = false): Point2[] {
    const path = closed ? [...points, points[0]] : points
    const segmentLengths = path.slice(1).map((p, i) => Math.hypot(p[0] - path[i][0], p[1] - path[i][1]))
    const totalLength = segmentLengths.reduce((sum, l) => sum + l, 0)
    const count = Math.max(2, Math.round(totalLength / spacing))
    const steps = closed ? count : count - 1

    const result: Point2[] = []
    let segment = 0
    let segmentStart = 0
    for (let i = 0; i < count; i++) {
        const target = (i / steps) * totalLength
        while (segment < segmentLengths.length - 1 && segmentStart + segmentLengths[segment] < target) {
            segmentStart += segmentLengths[segment]
            segment++
        }
        const t = segmentLengths[segment] === 0 ? 0 : (target - segmentStart) / segmentLengths[segment]
        const [ax, ay] = path[segment]
        const [bx, by] = path[segment + 1]
        result.push([ax + (bx - ax) * t, ay + (by - ay) * t])
    }
    return result
}
