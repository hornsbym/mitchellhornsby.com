'use client'
import { NavContext } from "@/app/contexts/navContext"
import { MouseEvent, useEffect, useState } from "react"
import { NavButton } from "./NavButton"
import { NavSubMenu } from "./NavSubMenu"
import { NavSubMenuButton } from "./NavSubMenuButton"
import { NavSubMenuLink } from "./NavSubMenuLink"
import { NavLink } from "./NavLink"
import Hamburger from "hamburger-react"
import { RiDownload2Fill, RiDownloadFill } from "react-icons/ri"

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
        positiveDrawerWidth,
        negativeDrawerWidth,
        width
    ] = (() => {
        let pos, neg, width = ''

        switch (drawerWidth) {
            case (25):
                pos = 'sm:left-[25%]'
                neg = 'sm:left-[-25%]'
                width = 'sm:w-[25%]'
                break
            case (50):
                pos = 'sm:left-[50%]'
                neg = 'sm:left-[-50%]'
                width = 'sm:w-[50%]'
                break
            case (75):
                pos = 'sm:left-[75%]'
                neg = 'sm:left-[-75%]'
                width = 'sm:w-[75%]'
                break
            case (100):
                break
        }
        return [pos, neg, width]
    })()

    return (<div className={`relative min-h-screen overflow-x-hidden flex flex-col`}>
        <div className={`fixed top-0 bg-black w-full z-10 flex flex-row w-full justify-between px-4 items-center`}>
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
        {/* Drawer (navitems) */}
        <div className="flex flex-row">

        </div>
        <nav className={`${navOpen ? 'left-0' : `${negativeDrawerWidth} left-[-100%]`} ${width} ${transition} fixed h-full w-[100%] bg-black drop-shadow-xl`}>
            <NavContext.Provider value={{
                isNavOpen: navOpen,
                setNavOpen: setNavOpen
            }}>
                <ul className="absolute flex flex-col flex-1 h-full top-0 left-0 right-0 bottom-0 p-4">
                    <NavLink
                        label={<span className="text-white">Home</span>}
                        href={`/`}
                        classNames={{
                            labelContainer: '!bg-black'
                        }}
                    />
                    <NavSubMenu
                        label={<span className="text-white">Projects</span>}
                    >
                        <NavSubMenuLink
                            label={"Novel Concept Studio"}
                            href={`/novel-concept-studio`}
                        />
                        <NavSubMenu label='Nxu'>
                            <NavSubMenuLink
                                label={"Admin Panel"}
                                href={`nxu-admin-panel`}
                            />
                            <NavSubMenuLink
                                label={"Consumer App"}
                                href={``}
                            />
                        </NavSubMenu>
                        <NavSubMenu label='Mayo Clinic'>
                            <NavSubMenuLink
                                label={"Patient Website"}
                                href={``}
                            />
                            <NavSubMenuLink
                                label={"UDD Survey"}
                                href={``}
                            />
                        </NavSubMenu>
                    </NavSubMenu>
                    <NavLink
                        label={<span className="text-white">Get in Touch</span>}
                        href={`/`}
                        classNames={{
                            labelContainer: '!bg-black'
                        }}
                    />
                </ul>
            </NavContext.Provider>
        </nav>
        <div>
            <div className={`${navOpen ? 'opacity-100' : 'opacity-0'} overlay absolute top-0 right-0 bottom-0 left-0 h-screen bg-black/40 z-20`} />
        </div>
        <div className={`${navOpen ? `${positiveDrawerWidth} left-[100%]` : 'left-0'} ${transition} bg-white absolute top-0 bottom-0 right-0 w-full`}>
            {/* Content */}
            {children}
        </div>
    </div>
    )
}