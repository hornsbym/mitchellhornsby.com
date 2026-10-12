import { EmojiCoinShape, Point2 } from "../emojiCoin"

// Traced in pixels from a photo of Half Dome seen from Glacier Point, then scaled and centred
// so the dome spans about 2.2 units with its base along the bottom
const fromPixels = (points: Point2[]): Point2[] =>
    points.map(([x, y]) => [(x - 420) * 0.00306, (360 - y) * 0.00306])

const baseY = 600

/** Half Dome: a sheer cut face on the left, the rounded dome falling away to the right */
export const halfDome: EmojiCoinShape = {
    outline: fromPixels([
        [65, baseY],
        // Left buttress, then the ledge at the foot of the cliff
        [68, 480], [80, 400], [100, 320], [112, 300], [150, 290], [195, 255],
        // The sheer face up to the summit
        [215, 200], [230, 140], [240, 115],
        // Nearly flat summit, then the dome curving over and down to the right
        [270, 110], [300, 112], [330, 108], [380, 105], [440, 112], [500, 135], [530, 150],
        [570, 190], [600, 230], [640, 290], [680, 370], [710, 430], [740, 500], [765, 570],
        [775, baseY],
    ]),
    details: [
        // Dark water streak running down the face from the summit
        fromPixels([[285, 130], [290, 200], [280, 300], [270, 380], [275, 440]]),
        // Where the sheer face turns into the curve of the dome
        fromPixels([[330, 115], [345, 200], [355, 300], [370, 400], [380, 450]]),
        // Shadowed edge of the left buttress
        fromPixels([[195, 255], [180, 350], [170, 450], [175, 560]]),
        // Exfoliation sheet following the dome's curve
        fromPixels([[420, 160], [500, 190], [570, 260], [620, 350], [660, 450], [690, 540]]),
        // Forested ridge in front of the base
        fromPixels([[300, 470], [420, 455], [560, 500], [700, 560], [740, 585]]),
    ],
}
