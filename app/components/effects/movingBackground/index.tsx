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
        for (let i = 0; i < maxShapes; i++) {
            initShapes.push({ className: i % 2 === 0 ? 'hidden sm:flex' : '' })
        }

        setShapes(initShapes)
    }, [])


    return (
        <div className={`fixed top-0 right-0 bottom-0 left-0 ${classNames.container ?? ''} bg-white dark:bg-sky-900`}>
            <div className="relative top-0 right-0 bottom-0 left-0 h-screen w-screen">
                {shapes.map((shape, i) => <Shape key={`shape-${i}`} {...shape} />)}
            </div>
        </div>
    )
}

type ShapeProps = {
    className?: string
}

const Shape = ({
    className = ''
}: ShapeProps) => {
    const [trigger, activateTrigger] = useState(false)

    const [
        startSize,
        endSize,
        duration,
        delayTime
    ] = (() => {
        let
            startSize,
            endSize,
            duration,
            delayTime;

        duration = getRandomArbitrary(5000, 15000)
        delayTime = getRandomArbitrary(0, 10000)

        startSize = `${getRandomArbitrary(4, 6)}rem`
        endSize = `${getRandomArbitrary(0, 4)}rem`

        return [
            startSize,
            endSize,
            duration,
            delayTime,
        ]
    })()

    useEffect(() => {
        const interval = setInterval(() => {
            activateTrigger(false)
        }, duration + delayTime + 1000)

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
                rounded-full
                bg-sky-200
                dark:bg-gray-200
                aspect-square
                !ease-in
                ${className}
                ${trigger
                    ? `opacity-0`
                    : `opacity-60 !transition-none`
                }
            `}


            style={
                trigger ? ({
                    width: endSize,
                    right: `${getRandomArbitrary(50, 125)}%`,
                    top: `${getRandomArbitrary(110, 150)}%`,
                    transitionDelay: `${delayTime}ms`,
                    transitionDuration: `${duration}ms`
                }) : ({
                    top: `-${getRandomArbitrary(10, 50)}%`,
                    right: `${getRandomArbitrary(-100, 115)}%`,
                    width: startSize,
                })
            }
        />
    )
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
