'use client'
import { useEffect, useState } from "react"

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
    const maxShapes = 200
    const [shapes, setShapes] = useState<ShapeProps[]>([])

    useEffect(() => {
        let initShapes: ShapeProps[] = []
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 0 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 1 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 2 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 3 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 4 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 5 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 6 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 7 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 8 })
        }
        for (let i = 0; i < maxShapes / 10; i++) {
            initShapes.push({ delay: 9 })
        }

        setShapes(initShapes)
    }, [])


    return (
        <div className={`fixed top-0 right-0 bottom-0 left-0 ${classNames.container ?? ''}`}>
            <div className="relative top-0 right-0 bottom-0 left-0 h-screen w-screen">
                {shapes.map((shape, i) => <Shape key={`shape-${i}`} {...shape} />)}
            </div>
        </div>
    )
}

type ShapeProps = {
    delay: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    className?: string
}

const Shape = ({
    delay,
    className = ''
}: ShapeProps) => {
    const [trigger, activateTrigger] = useState(false)

    const [
        startTop,
        endTop,
        startRight,
        endRight,
        duration,
        size,
        delayClass
    ] = (() => {
        let
            startTop,
            endTop,
            startRight,
            endRight,
            duration,
            size,
            delayClass
                = ''

        const topRand = Math.random()
        const rightRand = Math.random()
        const sizeRand = Math.random()

        if (topRand < .10) {
            startTop = 'top-[25%]'
            endTop = 'top-[25%]'
        }
        else if (topRand < .20) {
            startTop = 'top-[50%]'
            endTop = 'top-[-50%]'
        }
        else if (topRand < .30) {
            startTop = 'top-[75%]'
            endTop = 'top-[-75%]'
        }
        else if (topRand < .40) {
            startTop = 'top-[100%]'
            endTop = 'top-[-100%]'
        }
        else if (topRand < .50) {
            startTop = 'top-[125%]'
            endTop = 'top-[-125%]'
        }
        else if (topRand < .60) {
            startTop = 'top-[150%]'
            endTop = 'top-[-150%]'
        }
        else if (topRand < .70) {
            startTop = 'top-[175%]'
            endTop = 'top-[-175%]'
        }
        else if (topRand < .80) {
            startTop = 'top-[200%]'
            endTop = 'top-[-200%]'
        }
        else if (topRand < .90) {
            startTop = 'top-[225%]'
            endTop = 'top-[-225%]'
        }
        else {
            startTop = 'top-[250%]'
            endTop = 'top-[-250%]'
        }

        if (rightRand < .1) {
            startRight = 'right-[105%]'
            endRight = 'right-[-105%]'
        } else if (rightRand < .2) {
            startRight = 'right-[115%]'
            endRight = 'right-[-115%]'
        } else if (rightRand < .3) {
            startRight = 'right-[125%]'
            endRight = 'right-[-125%]'
        } else if (rightRand < .4) {
            startRight = 'right-[135%]'
            endRight = 'right-[-135%]'
        } else if (rightRand < .5) {
            startRight = 'right-[145%]'
            endRight = 'right-[-145%]'
        } else if (rightRand < .6) {
            startRight = 'right-[155%]'
            endRight = 'right-[-155%]'
        } else if (rightRand < .7) {
            startRight = 'right-[165%]'
            endRight = 'right-[-165%]'
        } else if (rightRand < .8) {
            startRight = 'right-[175%]'
            endRight = 'right-[-175%]'
        } else if (rightRand < .9) {
            startRight = 'right-[185%]'
            endRight = 'right-[-185%]'
        } else {
            startRight = 'right-[195%]'
            endRight = 'right-[-195%]'
        }


        switch (delay) {
            case (1):
                delayClass = 'delay-[6s]'
                break
            case (2):
                delayClass = 'delay-[12s]'
                break
            case (3):
                delayClass = 'delay-[18s]'
                break
            case (4):
                delayClass = 'delay-[24s]'
                break
            case (5):
                delayClass = 'delay-[30s]'
                break
            case (6):
                delayClass = 'delay-[36s]'
                break
            case (7):
                delayClass = 'delay-[42s]'
                break
            case (8):
                delayClass = 'delay-[48s]'
                break
            case (9):
                delayClass = 'delay-[54s]'
                break
        }

        if (sizeRand < .25) {
            size = 'w-8 h-8'
        } else if (sizeRand < .5) {
            size = 'w-12 h-12'
        } else if (sizeRand < .75) {
            size = 'w-16 h-16'
        } else {
            size = 'w-20 h-20'
        }

        duration = '!duration-[30s]'

        return [
            startTop,
            endTop,
            startRight,
            endRight,
            duration,
            size,
            delayClass
        ]
    })()

    useEffect(() => {
        const interval = setInterval(() => {
            activateTrigger(false)
        }, 30000 + delay * 6000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!trigger) {
            setTimeout(() => {
                activateTrigger(true)
            }, 100)
        }
    }, [trigger])

    return (
        <div
            className={`
                absolute
                ${size}
                rounded-full
                bg-sky-200
                dark:bg-gray-200
                !ease-in
                ${duration}
                ${delayClass}
                ${className}
                ${trigger
                    ? `${startTop} ${startRight} opacity-0`
                    : `${endTop}  ${endRight} opacity-100  !transition-none`
                }
            `}
        />
    )
}

