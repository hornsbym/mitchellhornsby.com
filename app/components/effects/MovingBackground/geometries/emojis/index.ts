import { EmojiCoinShape } from "../emojiCoin"
import { alien } from "./alien"
import { football } from "./football"
import { halfDome } from "./halfDome"
import { mountain } from "./mountain"
import { skier } from "./skier"
import { technologist } from "./technologist"

type EmojiCoin = {
    shape: EmojiCoinShape
    /** Rotation in the coin's own plane, in radians */
    tilt?: number
}

/**
 * Every emoji that can be rendered as a coin, keyed by the name used in its URL
 */
export const emojiCoins: Record<string, EmojiCoin> = {
    alien: { shape: alien },
    football: { shape: football, tilt: Math.PI / 4 },
    'half-dome': { shape: halfDome },
    mountain: { shape: mountain },
    skier: { shape: skier },
    technologist: { shape: technologist },
}
