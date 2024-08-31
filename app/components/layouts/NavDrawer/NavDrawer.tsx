'use client'
import { NavContext } from "@/app/contexts/navContext"
import { useEffect, useState } from "react"
import { NavSubMenu } from "./NavSubMenu"
import { NavLink } from "./NavLink"
import Hamburger from "hamburger-react"
import { RiDownloadFill, RiExternalLinkFill } from "react-icons/ri"

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
        <div className={`relative min-h-screen flex flex-col overflow-x-hidden pt-16`}>
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
            <div className={`${navOpen ? 'left-0' : `${negativeDrawerWidth} left-[-100vw]`} ${transition} absolute flex`}>
                {/* Navbar drawer */}
                <nav className={`${width} w-[100vw] flex h-screen overflow-scroll sticky top-0 pb-64 sm:pb-0`}>
                    <NavContext.Provider value={{
                        isNavOpen: navOpen,
                        setNavOpen: setNavOpen
                    }}>
                        <ul className="flex flex-col h-fit flex-1 p-4 gap-2">
                            <NavLink
                                label={<span className="text-white">Home</span>}
                                href={`/#home`}
                                classNames={{
                                    container: 'border-white',
                                    labelContainer: '!bg-black'
                                }}
                            />
                            <NavSubMenu
                                label={"Recent Projects"}
                            >
                                <NavSubMenu label="Novel Concept Studio">
                                    <NavLink
                                        label={"Bean Around the Block"}
                                        href={`https://beanaroundtheblock.novelconcept.io`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
                                    <NavLink
                                        label={"Diamond Jim's"}
                                        href={`https://diamondjims.novelconcept.io`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
                                    <NavLink
                                        label={"Dinners By Derek"}
                                        href={`https://dinnersbyderek.com`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
                                    <NavLink
                                        label={"Hornsby Health and Fitness"}
                                        href={`https://hornsbyhealthandfitness.com`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
                                </NavSubMenu>
                                <NavSubMenu label='Nxu'>
                                    <NavLink
                                        label={"Internal Admin Panel"}
                                        href={`https://admin.charging.nxuenergy.com/login`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
                                    <NavLink
                                        label={"NxuOne Consumer App"}
                                        href={`https://charging.nxuenergy.com/`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}

                                    />
                                </NavSubMenu>
                                <NavSubMenu label='Mayo Clinic'>
                                    <NavLink
                                        label={"Patient Website"}
                                        href={`https://www.mayoclinic.org/`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
                                </NavSubMenu>
                                <NavSubMenu label='Marriott'>
                                    <NavLink
                                        label={"Homes and Villas"}
                                        href={`https://homes-and-villas.marriott.com/`}
                                        linkProps={{
                                            target: '__blank'
                                        }}
                                        icon={<RiExternalLinkFill />}
                                    />
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
                <div className={`relative bg-white w-screen`}>
                    {/* Content and overlay */}
                    <div
                        className={`${navOpen ? 'opacity-100' : 'opacity-0 z-[-10]'} absolute top-0 right-0 bottom-0 left-0 bg-black/40 `}
                        onClick={() => setNavOpen(false)}
                    />
                    {children}
                    <footer className="flex flex-row w-full p-4 bg-black text-white justify-center items-center">
                        &copy;2024 Mitchell Hornsby
                    </footer>
                </div>
            </div>
        </div>
    )
}