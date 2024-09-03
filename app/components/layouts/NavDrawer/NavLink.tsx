import { NavContext } from "@/app/contexts/navContext"
import Link from "next/link"
import { useContext } from "react"
import { RiArrowRightLine } from "react-icons/ri"

type NavLinkProps = {
    label: React.ReactNode
    href: string
    classNames?: ClassOverrides
    linkProps?: object
    icon?: React.ReactNode
}

type ClassOverrides = {
    container?: string
    labelContainer?: string
}

export const NavLink = ({
    label,
    href,
    classNames,
    linkProps,
    icon = <RiArrowRightLine className="text-white" />
}: NavLinkProps) => {
    const {
        isNavOpen,
        setNavOpen
    } = useContext(NavContext)

    return (
        <li className={`relative z-10 group w-full border-l-2 border-sky-800 ${classNames?.container ?? ''}`}>
            <div className="absolute z-[-20] flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 w-8 bg-sky-800">
                {icon}
            </div>
            {/* When nav is closed, turn links in to text so they are removed from the tab flow */}
            <Link
                className={`${isNavOpen ? 'flex' : 'hidden'} transition-[margin] bg-white group-hover:ml-8 group-focus-within:ml-8 items-center p-2 ${classNames?.labelContainer ?? ''}`}
                href={href}
                onClick={() => setNavOpen(false)}
                {...linkProps}
            >
                {label}
            </Link>
            <span
                className={`${isNavOpen ? 'hidden' : 'flex'} p-2`}
            >
                {label}
            </span>
        </li>
    )
}