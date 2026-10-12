import { EmojiCoinShape, Point2 } from "./emojiCoin"

type Edge = { from: Point2, to: Point2 }

/**
 * Turns a pixel-art grid into a coin shape. Each row is a string where `X` is a filled pixel.
 * The outer edge of the filled pixels becomes the outline, enclosed gaps become holes through
 * the coin, and the lines between neighbouring pixels are drawn on the faces as a grid.
 */
export function pixelArt(rows: string[], width = 2.2): EmojiCoinShape {
    const columnCount = rows[0].length
    const pixelSize = width / columnCount
    const filled = (column: number, row: number) => rows[row]?.[column] === 'X'
    // Grid corners are (column, row) with rows counting down; centre the drawing on the origin
    const toPoint = ([column, row]: Point2): Point2 =>
        [(column - columnCount / 2) * pixelSize, (rows.length / 2 - row) * pixelSize]

    // Walk every filled pixel's edges in the same rotational direction. Edges facing an empty
    // neighbour form the boundary; edges between two filled pixels become grid lines.
    const boundaryEdges: Edge[] = []
    const gridLines: Point2[][] = []
    rows.forEach((rowPixels, row) => {
        for (let column = 0; column < rowPixels.length; column++) {
            if (!filled(column, row)) {
                continue
            }
            const sides: [boolean, Point2, Point2][] = [
                [filled(column, row - 1), [column, row], [column + 1, row]],
                [filled(column + 1, row), [column + 1, row], [column + 1, row + 1]],
                [filled(column, row + 1), [column + 1, row + 1], [column, row + 1]],
                [filled(column - 1, row), [column, row + 1], [column, row]],
            ]
            sides.forEach(([neighbourFilled, from, to], side) => {
                if (!neighbourFilled) {
                    boundaryEdges.push({ from, to })
                } else if (side < 2) {
                    // Only the top and right sides, so each shared edge is drawn once
                    gridLines.push([toPoint(from), toPoint(to)])
                }
            })
        }
    })

    const loops = chainIntoLoops(boundaryEdges).map(loop => loop.map(toPoint))
    // The largest loop is the outer edge; the rest are eye holes and other gaps
    loops.sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)))

    return {
        outline: loops[0],
        extraOutlines: loops.slice(1),
        details: gridLines,
    }
}

/**
 * Joins edges end to end into closed loops, keeping only the corners
 */
function chainIntoLoops(edges: Edge[]): Point2[][] {
    const key = ([x, y]: Point2) => `${x},${y}`
    const edgesFrom = new Map<string, Edge[]>()
    edges.forEach(edge => edgesFrom.set(key(edge.from), [...(edgesFrom.get(key(edge.from)) ?? []), edge]))

    const loops: Point2[][] = []
    const used = new Set<Edge>()
    for (const start of edges) {
        if (used.has(start)) {
            continue
        }
        const loop: Point2[] = []
        let edge: Edge | undefined = start
        while (edge && !used.has(edge)) {
            used.add(edge)
            loop.push(edge.from)
            edge = edgesFrom.get(key(edge.to))?.find(next => !used.has(next))
        }
        loops.push(loop.filter((point, i) => !isStraight(loop.at(i - 1)!, point, loop[(i + 1) % loop.length])))
    }
    return loops
}

const isStraight = (a: Point2, b: Point2, c: Point2) =>
    (b[0] - a[0]) * (c[1] - b[1]) === (b[1] - a[1]) * (c[0] - b[0])

const area = (loop: Point2[]) =>
    loop.reduce((sum, [x, y], i) => {
        const [nextX, nextY] = loop[(i + 1) % loop.length]
        return sum + x * nextY - nextX * y
    }, 0) / 2
