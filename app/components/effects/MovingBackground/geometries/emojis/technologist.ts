import { EmojiCoinShape, Point2, arc } from "../emojiCoin"

// Proportions traced from the Apple-style 👨‍💻, where the drawing spans -1 to 1 on both axes

/** Top edge of the laptop lid, which hides the chin and neck */
const lidTopY = -0.125
const lidTopHalfWidth = 0.75
/** Where the shoulders, peeking out either side of the lid, meet its sides */
const shoulderMeetsLid: Point2 = [0.79, -0.4]
const faceHalfWidth = 0.5
const earY = 0.17
const earRadius = 0.1
const hairY = 0.4
const hairRadius = 0.55

const ellipse = (cx: number, cy: number, rx: number, ry: number, steps = 12): Point2[] =>
    arc(0, 0, 1, 0, Math.PI * 2, steps).map(([x, y]) => [cx + x * rx, cy + y * ry])

// Right half of the silhouette from the bottom corner up to the top of the head; mirrored for the left
const rightSide: Point2[] = [
    [1.0, -1.0],
    [1.0, -0.62],
    ...arc(0.79, -0.62, 0.21, 0, Math.PI / 2, 8).slice(1, -1), // shoulder
    shoulderMeetsLid,
    [lidTopHalfWidth, lidTopY],
    [faceHalfWidth, lidTopY],
    [faceHalfWidth + 0.02, earY - earRadius],
    ...arc(faceHalfWidth + 0.04, earY, earRadius, -Math.PI / 2, Math.PI / 2, 12), // ear
    [faceHalfWidth + 0.03, hairY - 0.05],
    ...arc(0, hairY, hairRadius, -0.05, Math.PI / 2, 24), // hair, up to the crown
]
const mirror = (points: Point2[]): Point2[] => points.map(([x, y]) => [-x, y])

/** 👨‍💻 a man with swept-up hair peering over the lid of a large laptop */
export const technologist: EmojiCoinShape = {
    outline: [...rightSide, ...mirror(rightSide).reverse().slice(1)],
    details: [
        // Top edge of the lid where it crosses in front of the face
        [[-faceHalfWidth, lidTopY], [faceHalfWidth, lidTopY]],
        // Sides of the lid, running down between the shoulders
        [shoulderMeetsLid, [0.81, -0.97]],
        [mirror([shoulderMeetsLid])[0], [-0.81, -0.97]],
        // Logo on the back of the lid
        arc(0, -0.6, 0.1, 0, Math.PI * 2, 20),
        // Hairline across the forehead, from temple to temple
        [[-0.52, 0.32], [-0.46, 0.46], [-0.28, 0.52], [-0.05, 0.5], [0.2, 0.54], [0.42, 0.5], [0.52, 0.32]],
        // Hair swept up and over to the right into a quiff
        [[-0.32, 0.58], [-0.12, 0.74], [0.15, 0.84], [0.32, 0.86]],
        [[0.0, 0.55], [0.18, 0.68], [0.4, 0.72]],
        // Inside of each ear
        arc(faceHalfWidth + 0.04, earY, earRadius * 0.5, -Math.PI / 2, Math.PI / 2, 8),
        mirror(arc(faceHalfWidth + 0.04, earY, earRadius * 0.5, -Math.PI / 2, Math.PI / 2, 8)),
        // Eyebrows
        arc(-0.2, 0.29, 0.1, Math.PI * 0.3, Math.PI * 0.7, 8),
        arc(0.2, 0.29, 0.1, Math.PI * 0.3, Math.PI * 0.7, 8),
        // Small mouth just above the lid
        arc(0, 0.06, 0.09, -Math.PI * 0.7, -Math.PI * 0.3, 8),
    ],
    boldDetails: [
        // Tall oval eyes
        ellipse(-0.2, 0.2, 0.045, 0.07),
        ellipse(0.2, 0.2, 0.045, 0.07),
    ],
}
