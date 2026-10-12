import { EmojiCoinShape, Point2 } from "../emojiCoin"

const halfLength = 1
const halfWidth = 0.6
/** How pointed the tips are: 1 is sharp, lower values round them off */
const tipSharpness = 0.8

// Half-height of the football outline at a given x
const outlineHalfHeight = (x: number) =>
    halfWidth * Math.pow(Math.max(0, 1 - (x / halfLength) ** 2), tipSharpness)

const outline = Array.from({ length: 600 }, (_, i): Point2 => {
    const t = (i / 600) * Math.PI * 2
    const s = Math.sin(t)
    return [halfLength * Math.cos(t), Math.sign(s) * halfWidth * Math.pow(Math.abs(s), 2 * tipSharpness)]
})

// End stripes: two bands near each tip, bowed toward the centre like the emoji's
const stripes = [-1, 1].flatMap(side => [0.56, 0.68].map(offset => {
    const x0 = offset * halfLength
    const yMax = outlineHalfHeight(x0) * 0.94
    return Array.from({ length: 50 }, (_, i): Point2 => {
        const y = -yMax + (i / 49) * 2 * yMax
        const bow = 0.06 * halfLength * (1 - (y / yMax) ** 2)
        return [side * (x0 - bow), y]
    })
}))

// Laces: a seam along the long axis with evenly spaced cross stitches
const seamHalfLength = 0.4 * halfLength
const stitchHalfHeight = 0.22 * halfWidth
const laces: Point2[][] = [
    [[-seamHalfLength, 0], [seamHalfLength, 0]],
    ...Array.from({ length: 6 }, (_, i): Point2[] => {
        const x = -seamHalfLength * 0.85 + (i / 5) * seamHalfLength * 1.7
        return [[x, -stitchHalfHeight], [x, stitchHalfHeight]]
    }),
]

/** 🏈 lying along the X axis */
export const football: EmojiCoinShape = {
    outline,
    details: stripes,
    boldDetails: laces,
}
