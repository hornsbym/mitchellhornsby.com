'use client'
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"
import EmojiCoin from "@/app/components/effects/MovingBackground/backgrounds/EmojiCoin";

type EmojiSceneProps = {
    /** Key of the emoji in `emojiCoins` */
    name: string
}

/**
 * Full-screen canvas showing a spinning emoji coin
 */
export default function EmojiScene({
    name
}: EmojiSceneProps) {
    const [darkMode, setDarkMode] = useState<boolean | undefined>()
    const [leaving, setLeaving] = useState(false)

    // Match the dark mode preference saved by the main site
    useEffect(() => {
        setDarkMode(localStorage.getItem('darkModeEnabled') === 'yes')
    }, [])

    if (darkMode === undefined) {
        return null
    }

    return (
        <div className={`${darkMode ? 'dark' : ''} fixed top-0 right-0 bottom-0 left-0`}>
            {/* Clicking anywhere plays the exit, and clicking again brings the emoji back */}
            <div className="h-full w-full bg-white dark:bg-zinc-900" onClick={() => setLeaving(!leaving)}>
                <Canvas>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[2, 3, 5]} intensity={2} />
                    <EmojiCoin name={name} color={darkMode ? '#ff9900' : '#dd8800'} size={0.035} leaving={leaving} />
                </Canvas>
            </div>
        </div>
    )
}
