'use client'
import { NavContext } from "@/app/contexts/navContext"
import { useEffect, useState } from "react"
import { NavSubMenu } from "./NavSubMenu"
import { NavLink } from "./NavLink"
import Hamburger from "hamburger-react"
import { RiDownloadFill, RiExternalLinkFill, RiLoader4Fill } from "react-icons/ri"
import { DarkModeContext } from "@/app/contexts/darkModeContext"
import Toggle from "../../toggle"
import MovingBackground from "../../effects/movingBackground"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { BsDownload } from "react-icons/bs"

const apolloClient = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql`,
    cache: new InMemoryCache(),
});


type NavDrawerProps = {
    children: React.ReactNode
    drawerWidth?: 25 | 50 | 75 | 100
}

export default function NavDrawer({
    children,
    drawerWidth = 50
}: NavDrawerProps) {
    const [darkMode, setDarkMode] = useState<boolean | undefined>()
    const [navOpen, setNavOpen] = useState(false)

    useEffect(() => {
        setDarkMode(localStorage.getItem('darkModeEnabled') === 'yes' ? true : false)
    }, [])

    useEffect(() => {
        function listenerFunc(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setNavOpen(false)
            }
        }
        document.addEventListener('keydown', listenerFunc)

        return () => {
            document.removeEventListener('keydown', listenerFunc)
        }
    }, [])

    useEffect(() => {
        if (darkMode !== undefined) localStorage.setItem("darkModeEnabled", darkMode === true ? 'yes' : 'no')
    }, [darkMode])

    const transition = `transition-[left] duration-[350ms] ease-out`

    const [
        drawerLeft,
        negativeDrawerLeft,
        width
    ] = (() => {
        let drawerLeft, negDrawerLeft, width = ''

        switch (drawerWidth) {
            case (25):
                drawerLeft = 'sm:left-[25rem]'
                negDrawerLeft = 'sm:left-[-25rem]'
                width = 'sm:w-[25rem]'
                break
            case (50):
                drawerLeft = 'sm:left-[50rem]'
                negDrawerLeft = 'sm:left-[-50rem]'
                width = 'sm:w-[50rem]'
                break
            case (75):
                drawerLeft = 'sm:left-[75rem]'
                negDrawerLeft = 'sm:left-[-75rem]'
                width = 'sm:w-[75rem]'
                break
            default:
                drawerLeft = 'sm:left-[100vw]'
                negDrawerLeft = 'sm:left-[-100vw]'
                width = 'sm:w-[100vw]'
                break
        }
        return [drawerLeft, negDrawerLeft, width]
    })()

    return (
        <ApolloProvider client={apolloClient}>
            <DarkModeContext.Provider value={{
                darkMode: darkMode,
                toggleDarkMode: () => {
                    setDarkMode(!darkMode)
                }
            }}>
                <div className={`${darkMode ? 'dark' : ''} w-full h-screen overflow-x-clip`}>
                    {
                        darkMode === undefined && (
                            <div className="fixed z-[99] flex flex-row w-full min-h-screen justify-center items-center bg-zinc-900">
                                <RiLoader4Fill className="!transition-none animate-spin text-[5rem] text-white" />
                            </div>)
                    }

                    {/* Navbar (permanently fixed to the top of the screen) */}
                    <div className={`
                    fixed
                    top-0
                    overflow-x-hidden
                    overflow-y-hidden
                    bg-zinc-400
                    dark:bg-zinc-600
                    w-full
                    h-16
                    z-20
                    flex
                    flex-row
                    w-full
                    justify-between
                    p-4
                    items-center
                    z-20
                    `}>
                        <div className={`flex flex-row gap-4`}>
                            <button
                                onClick={() => setNavOpen(!navOpen)}
                                className="dm-text p-4"
                            >
                                <Hamburger toggled={navOpen} />
                            </button>
                            <div className="flex flex-row items-center gap-2">
                                <Toggle
                                    toggled={darkMode}
                                    onToggle={() => setDarkMode(!darkMode)}
                                    size="small"
                                />
                            </div>
                        </div>
                        <a
                            className="bg-yellow-500 dark:bg-yellow-400 flex flex-col items-center justify-center px-4 py-2 rounded-lg"
                            target="__blank"
                            href="/2024_revised_resume_web_dev.pdf"
                            download={"2024_revised_resume_web_dev"}
                            onClick={async () => {
                                const res = await fetch('/api/resumeDownload', {
                                    method: "POST"
                                })
                            }}
                        >
                            <span className="flex flex-row gap-1 items-center"><span className="hidden sm:flex">Take my</span>Resume<BsDownload className="ml-2"/></span>
                        </a>
                    </div>
                    {/* Navbar drawer */}
                    <nav className={`
                    ${width} 
                    w-screen
                    ${navOpen ? `left-0` : `${negativeDrawerLeft} left-[-100vw]`}
                    ${transition}
                    fixed
                    top-16
                    bottom-0
                    bg-zinc-200
                    dark:bg-zinc-600
                    overflow-y-auto
                    overflow-x-hidden
                    z-10
                `}>
                        <NavContext.Provider value={{
                            isNavOpen: navOpen,
                            setNavOpen: setNavOpen
                        }}>
                            <ul className="flex flex-col h-fit flex-1 p-4 gap-2">
                                <NavLink
                                    label={<span className="dm-text">Home</span>}
                                    href={`/#home`}
                                    classNames={{
                                        container: 'border-black dark:border-white',
                                        labelContainer: '!bg-zinc-200 dark:!bg-zinc-600'
                                    }}
                                />
                                <NavSubMenu
                                    label={"Recent Projects"}
                                >
                                    <NavSubMenu label="Novel Concept Studio">
                                        <NavLink
                                            label={"Bean Catering"}
                                            href={`https://beancatering.novelconcept.io`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                        <NavLink
                                            label={"Goodness Cafe"}
                                            href={`https://goodnesscafe.novelconcept.io`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                        <NavLink
                                            label={"Loggers"}
                                            href={`https://loggers.novelconcept.io`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                        <NavLink
                                            label={"Sonora Brewing"}
                                            href={`https://sonorabrewing.novelconcept.io`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                    </NavSubMenu>
                                    <NavSubMenu label='Nxu'>
                                        <NavLink
                                            label={"Internal Admin Panel"}
                                            href={`https://admin.charging.nxuenergy.com/login`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                        <NavLink
                                            label={"NxuOne Consumer App"}
                                            href={`https://charging.nxuenergy.com/`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}

                                        />
                                    </NavSubMenu>
                                    <NavSubMenu label='Mayo Clinic'>
                                        <NavLink
                                            label={"Patient Website"}
                                            href={`https://www.mayoclinic.org/`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                    </NavSubMenu>
                                    <NavSubMenu label='Marriott'>
                                        <NavLink
                                            label={"Homes and Villas"}
                                            href={`https://homes-and-villas.marriott.com/`}
                                            linkProps={{
                                                target: '__blank'
                                            }}
                                            icon={<RiExternalLinkFill className="text-white" />}
                                        />
                                    </NavSubMenu>
                                </NavSubMenu>
                                <NavLink
                                    label={<span className="dm-text">Get in Touch</span>}
                                    href={`/#contact`}
                                    classNames={{
                                        container: 'border-black dark:border-white',
                                        labelContainer: '!bg-zinc-200 dark:!bg-zinc-600'
                                    }}
                                />
                            </ul>
                        </NavContext.Provider>
                    </nav>-


                    {/* Content and overlay */}
                    <div className={`${darkMode === undefined ? 'hidden' : ''} relative flex flex-col bg-zinc-200 dark:bg-zinc-600 w-screen`}>
                        <div className={`
                        ${navOpen ? `${drawerLeft} left-[100vw]` : 'left-0'} 
                        ${transition}
                        absolute
                        flex
                        `}
                        >
                            <MovingBackground />
                            <div className={`relative bg-transparent w-screen z-10`}>
                                <div
                                    className={`${navOpen ? 'opacity-100 z-10' : 'opacity-0 z-[-10]'} transition-[opacity] absolute top-0 right-0 bottom-0 left-0 bg-black/40 w-full`}
                                    onClick={() => setNavOpen(false)}
                                />
                                <div className="flex flex-col w-full" {...{ inert: navOpen ? 'true' as any : undefined }}>

                                    {children}

                                    <footer className="flex flex-row bg w-full p-4 bg-zinc-200 dark:bg-zinc-600 dm-text justify-center items-center">
                                        &copy;2024 Mitchell Hornsby
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DarkModeContext.Provider >
        </ApolloProvider>
    )
}