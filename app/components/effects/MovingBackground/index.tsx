import TorusBg from "./backgrounds/Torus"

type MovingBackgroundProps = {
    classNames?: ClassOverrides
}

type ClassOverrides = {
    container?: string
}

/**
 * Randomly spawns and manages moving shapes in the background
 * @returns 
 */
export default function MovingBackground({
    classNames = {}
}: MovingBackgroundProps) {
    return (
        <div className={`fixed top-0 right-0 bottom-0 left-0 ${classNames.container ?? ''} bg-white dark:bg-zinc-900`}>
            <TorusBg />
        </div>
    )
}