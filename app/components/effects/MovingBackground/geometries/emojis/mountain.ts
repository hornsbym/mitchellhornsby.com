import { EmojiCoinShape } from "../emojiCoin"

/** ⛰️ a tall main peak with a smaller one in front of it to the right */
export const mountain: EmojiCoinShape = {
    outline: [
        [-1.1, -0.75],
        [1.1, -0.75],
        [0.6, 0.2],   // small peak
        [0.3, -0.05], // saddle between the peaks
        [-0.1, 0.75], // main peak
    ],
    details: [
        // Snow cap on the main peak
        [[-0.367, 0.35], [-0.27, 0.24], [-0.16, 0.37], [-0.04, 0.23], [0.1, 0.35]],
        // Snow cap on the small peak
        [[0.42, 0.05], [0.49, -0.03], [0.57, 0.06], [0.68, 0.05]],
        // Shadowed face of the main peak
        [[-0.12, 0.24], [-0.02, -0.05], [-0.06, -0.4]],
        // Where the small peak's slope runs down in front of the main one
        [[0.3, -0.05], [0.18, -0.4], [0.22, -0.75]],
    ],
}
