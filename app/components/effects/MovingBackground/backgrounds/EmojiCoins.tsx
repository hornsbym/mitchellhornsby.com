'use client'
import { Canvas } from "@react-three/fiber"
import { useContext, useEffect, useRef, useState } from "react"
import { DarkModeContext } from "@/app/contexts/darkModeContext"
import EmojiCoin, { introDuration } from "./EmojiCoin"

/** The emojis shown, in order; each must be a key of `emojiCoins` */
const emojiNames = ['technologist', 'half-dome', 'football', 'alien']
/** How long each emoji stays fully formed before it leaves, in seconds */
const holdDuration = 6
/** Extra spin speed added per pixel scrolled, as a multiple of the normal speed */
const spinBoostPerPixel = 0.02
/** Cap on the extra spin speed, so a long fast scroll doesn't send it whirling */
const maxSpinBoost = 15

/**
 * Cycles through every emoji coin: each one flies in, holds, then flies out to make way for the next
 */
export default function EmojiCoinsBg() {
    const { darkMode } = useContext(DarkModeContext)
    const [index, setIndex] = useState(0)
    const [leaving, setLeaving] = useState(false)
    const spinBoost = useRef(0)

    // Scrolling in either direction speeds up the spin; the coin eases it back down afterwards
    useEffect(() => {
        let lastScrollY = window.scrollY
        const onScroll = () => {
            const scrolled = Math.abs(window.scrollY - lastScrollY)
            lastScrollY = window.scrollY
            spinBoost.current = Math.min(maxSpinBoost, spinBoost.current + scrolled * spinBoostPerPixel)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Each new emoji enters, then starts leaving once its intro and hold are over
    useEffect(() => {
        setLeaving(false)
        const timer = setTimeout(() => setLeaving(true), (introDuration + holdDuration) * 1000)
        return () => clearTimeout(timer)
    }, [index])

    const name = emojiNames[index]
    return (
        <div className="relative top-0 right-0 bottom-0 left-0 h-screen w-screen">
            <Canvas>
                <ambientLight intensity={0.6} />
                <directionalLight position={[2, 3, 5]} intensity={2} />
                {/* Keyed by name so each emoji starts its own fresh intro */}
                <EmojiCoin
                    key={name}
                    name={name}
                    color={darkMode ? '#ff9900' : '#dd8800'}
                    size={0.035}
                    scale={2.5}
                    leaving={leaving}
                    onExited={() => setIndex((index + 1) % emojiNames.length)}
                    spinBoost={spinBoost}
                />
            </Canvas>
        </div>
    )
}
