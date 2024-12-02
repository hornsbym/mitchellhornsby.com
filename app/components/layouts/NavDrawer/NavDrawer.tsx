'use client'
import { useEffect, useState } from "react"
import { RiLoader4Fill } from "react-icons/ri"
import { DarkModeContext } from "@/app/contexts/darkModeContext"
import Toggle from "../../toggle"
import MovingBackground from "../../effects/MovingBackground"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { BsDownload } from "react-icons/bs"

const apolloClient = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql`,
    cache: new InMemoryCache(),
});


type NavContainerProps = {
    children: React.ReactNode
}

export default function NavContainer({
    children,
}: NavContainerProps) {
    const [darkMode, setDarkMode] = useState<boolean | undefined>()

    useEffect(() => {
        setDarkMode(localStorage.getItem('darkModeEnabled') === 'yes' ? true : false)
    }, [])

    useEffect(() => {
        if (darkMode !== undefined) {
            localStorage.setItem("darkModeEnabled", darkMode === true ? 'yes' : 'no')
        }
    }, [darkMode])

    return (
        <ApolloProvider client={apolloClient}>
            <DarkModeContext.Provider value={{
                darkMode: darkMode,
                toggleDarkMode: () => {
                    setDarkMode(!darkMode)
                }
            }}>
                <div className={`${darkMode ? 'dark' : ''} w-full overflow-x-clip`}>
                    {/* Navbar (permanently fixed to the top of the screen) */}
                    <div className={`
                        fixed
                        top-0
                        overflow-x-hidden
                        overflow-y-hidden
                        bg-zinc-600
                        w-full
                        h-16
                        z-20
                        flex
                        flex-row
                        justify-between
                        items-center
                        z-20
                    `}>
                        <div className={`relative flex flex-row w-full justify-between p-4`}>
                            <div className={`absolute top-0 right-0 bottom-0 left-0 bg-texture -z-1`} />
                            <div className={`relative z-1 flex flex-row gap-4`}>
                                <div className="flex flex-row items-center gap-2">
                                    <Toggle
                                        toggled={darkMode}
                                        onToggle={() => setDarkMode(!darkMode)}
                                        size="small"
                                    />
                                </div>
                            </div>
                            <a
                                className="relative z-1 bg-yellow-500 dark:bg-yellow-400 flex flex-col items-center justify-center px-4 py-2 rounded-lg"
                                target="__blank"
                                href="/2024_revised_resume_web_dev.pdf"
                                download={"2024_revised_resume_web_dev"}
                                onClick={async () => {
                                    const res = await fetch('/api/resumeDownload', {
                                        method: "POST"
                                    })
                                }}
                            >
                                <span className="flex flex-row gap-1 items-center"><span className="hidden sm:flex">Take my</span>Resume<BsDownload className="ml-2" /></span>
                            </a>
                        </div>

                    </div>

                    {/* Content and overlay */}
                    <div className={`${darkMode === undefined ? 'hidden' : ''} relative flex flex-col bg-zinc-200 dark:bg-zinc-600 w-screen`}>
                        <MovingBackground />
                        <div className={`relative bg-transparent w-screen z-10`}>
                            <div className="flex flex-col w-full">
                                {children}
                                <footer className="relative flex flex-row bg w-full p-4 bg-zinc-200 dark:bg-zinc-600 dm-text justify-center items-center">
                                    <div className={`absolute top-0 right-0 bottom-0 left-0 bg-texture -z-1`} />

                                    <span className="relative z-1">&copy;2024 Mitchell Hornsby</span>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </DarkModeContext.Provider >
        </ApolloProvider>
    )
}