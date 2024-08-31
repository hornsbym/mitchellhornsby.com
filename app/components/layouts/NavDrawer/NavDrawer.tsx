'use client'
import { NavContext } from "@/app/contexts/navContext"
import { useEffect, useState } from "react"
import { NavSubMenu } from "./NavSubMenu"
import { NavLink } from "./NavLink"
import Hamburger from "hamburger-react"
import { RiArrowRightLine, RiDownloadFill } from "react-icons/ri"

type NavDrawerProps = {
    children: React.ReactNode
    drawerWidth?: 25 | 50 | 75 | 100
}

export default function NavDrawer({
    children,
    drawerWidth = 50
}: NavDrawerProps) {
    const [navOpen, setNavOpen] = useState(false)

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

    const transition = `transition-[left] duration-[350ms] ease-out`

    const [
        negativeDrawerWidth,
        width
    ] = (() => {
        let neg, width = ''

        switch (drawerWidth) {
            case (25):
                neg = 'sm:left-[-25rem]'
                width = 'sm:w-[25rem]'
                break
            case (50):
                neg = 'sm:left-[-50rem]'
                width = 'sm:w-[50rem]'
                break
            case (75):
                neg = 'sm:left-[-75rem]'
                width = 'sm:w-[75rem]'
                break
            case (100):
                break
        }
        return [neg, width]
    })()

    return (
        <div className={`relative min-h-screen flex flex-col overflow-x-hidden`}>
            <div className={`sticky top-0 bg-black w-full z-10 flex flex-row w-full justify-between px-4 items-center`}>
                {/* Navbar (permanently fixed to the top of the screen) */}
                <button
                    onClick={() => setNavOpen(!navOpen)}
                    className="text-white p-4"
                >
                    <Hamburger toggled={navOpen} />
                </button>
                <a
                    className="bg-white flex flex-col items-center justify-center w-fit h-fit p-4"
                    target="__blank"
                    href="/hornsby_resume_2024.pdf"
                    download={"hornsby_resume_2024"}
                >
                    <span className="flex flex-row gap-1 items-center"><span className="hidden sm:flex">Download</span>Resume<RiDownloadFill /></span>
                </a>
            </div>
            <div className="relative">
                <div className={`${navOpen ? 'left-0' : `${negativeDrawerWidth} left-[-100vw]`} ${transition} absolute flex flex-row w-fit`}>
                    {/* Navbar drawer */}
                    {/* <div className="FINDME bg-black"> */}
                        <nav className={`${width} w-[100vw] flex-1 h-full bg-black drop-shadow-xl sticky top-[10%]`}>
                            <NavContext.Provider value={{
                                isNavOpen: navOpen,
                                setNavOpen: setNavOpen
                            }}>
                                <ul className="flex flex-col flex-1 p-4 gap-2">
                                    <NavLink
                                        label={<span className="text-white">Home</span>}
                                        href={`/#home`}
                                        classNames={{
                                            container: 'border-white',
                                            labelContainer: '!bg-black'
                                        }}
                                    />
                                    <NavSubMenu
                                        label={"Projects"}
                                    >
                                        <NavLink
                                            label={"Novel Concept Studio"}
                                            href={`/novel-concept-studio`}
                                        />
                                        <NavSubMenu label='Nxu'>
                                            <NavLink
                                                label={"Admin Panel"}
                                                href={`nxu-admin-panel`}
                                            />
                                            <NavLink
                                                label={"Consumer App"}
                                                href={``}
                                            />
                                        </NavSubMenu>
                                        <NavSubMenu label='Mayo Clinic'>
                                            <NavLink
                                                label={"Patient Website"}
                                                href={``}
                                            />
                                            <NavLink
                                                label={"UDD Survey"}
                                                href={``}
                                            />
                                            <a
                                                href='/'
                                                className="w-fit flex flex-row gap-1 items-center underline p-2 mt-2"
                                                onClick={() => { setNavOpen(false) }}
                                            >
                                                View all projects <RiArrowRightLine />
                                            </a>
                                        </NavSubMenu>
                                    </NavSubMenu>
                                    <NavLink
                                        label={<span className="text-white">Get in Touch</span>}
                                        href={`/#contact`}
                                        classNames={{
                                            container: 'border-white',
                                            labelContainer: '!bg-black'
                                        }}
                                    />
                                </ul>
                            </NavContext.Provider>
                        </nav>
                    {/* </div> */}


                    <div className={`relative bg-white w-screen`}>
                        {/* Content and overlay */}
                        <div
                            className={`${navOpen ? 'opacity-100' : 'opacity-0 z-[-10]'} absolute top-0 right-0 bottom-0 left-0 bg-black/40 `}
                            onClick={() => setNavOpen(false)}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}