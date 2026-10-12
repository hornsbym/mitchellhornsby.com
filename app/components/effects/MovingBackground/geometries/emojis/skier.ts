import polygonClipping from "polygon-clipping"
import { EmojiCoinShape, Point2, arc } from "../emojiCoin"

/** Set to true to face the skier left instead of right */
const facingLeft = false

/** A round-ended bar from `a` to `b` */
const capsule = ([ax, ay]: Point2, [bx, by]: Point2, radius: number, steps = 10): Point2[] => {
    const angle = Math.atan2(by - ay, bx - ax)
    return [
        ...arc(bx, by, radius, angle - Math.PI / 2, angle + Math.PI / 2, steps),
        ...arc(ax, ay, radius, angle + Math.PI / 2, angle + Math.PI * 1.5, steps),
    ]
}
const circle = ([cx, cy]: Point2, radius: number): Point2[] => arc(cx, cy, radius, 0, Math.PI * 2, 32).slice(0, -1)

// Key points of the pose: crouched, leaning forward, skis running downhill to the right
const hip: Point2 = [-0.15, -0.1]
const shoulder: Point2 = [0.15, 0.32]
const head: Point2 = [0.3, 0.6]
const frontHand: Point2 = [0.5, 0.08]
const backHand: Point2 = [0.36, 0.0]
const frontKnee: Point2 = [0.32, -0.28]
const backKnee: Point2 = [0.2, -0.35]
const frontBoot: Point2 = [0.22, -0.6]
const backBoot: Point2 = [0.05, -0.68]

const bodyParts: Point2[][] = [
    circle(head, 0.2),
    capsule(hip, shoulder, 0.2), // torso
    // Legs
    capsule(hip, backKnee, 0.13),
    capsule(backKnee, backBoot, 0.11),
    capsule(hip, frontKnee, 0.12),
    capsule(frontKnee, frontBoot, 0.1),
    // Boots
    capsule([backBoot[0] - 0.06, backBoot[1] - 0.04], [backBoot[0] + 0.1, backBoot[1] - 0.07], 0.07),
    capsule([frontBoot[0] - 0.06, frontBoot[1] - 0.04], [frontBoot[0] + 0.1, frontBoot[1] - 0.07], 0.065),
    // Arms reaching forward, with gloved hands
    capsule([shoulder[0] - 0.07, shoulder[1] - 0.04], backHand, 0.07),
    capsule(shoulder, frontHand, 0.075),
    circle(backHand, 0.07),
    circle(frontHand, 0.075),
    // Poles trailing back from the hands
    capsule(backHand, [-0.6, -0.42], 0.022),
    capsule(frontHand, [-0.45, -0.5], 0.022),
    // Skis, each with its tip curling up
    capsule([-0.9, -0.55], [0.9, -0.9], 0.035),
    capsule([0.9, -0.9], [1.0, -0.82], 0.035),
    capsule([-0.75, -0.42], [1.0, -0.78], 0.035),
    capsule([1.0, -0.78], [1.08, -0.7], 0.035),
]

// Merge the parts into one silhouette; the largest piece is the outline, and every other
// piece or enclosed gap gets its own rim
const area = (ring: Point2[]) => Math.abs(ring.reduce((sum, [x, y], i) => {
    const [nextX, nextY] = ring[(i + 1) % ring.length]
    return sum + x * nextY - nextX * y
}, 0) / 2)
const merged = polygonClipping.union([bodyParts[0]], ...bodyParts.slice(1).map(part => [part]))
    // Clipping returns closed rings that repeat their first point
    .map(polygon => polygon.map(ring => ring.slice(0, -1) as Point2[]))
    .sort((a, b) => area(b[0]) - area(a[0]))

const flip = (points: Point2[]): Point2[] => facingLeft ? points.map(([x, y]) => [-x, y]) : points

/** ⛷ a crouched skier heading downhill, poles trailing behind; just the silhouette, with plain faces */
export const skier: EmojiCoinShape = {
    outline: flip(merged[0][0]),
    extraOutlines: [...merged[0].slice(1), ...merged.slice(1).flat()].map(flip),
    details: [],
}
