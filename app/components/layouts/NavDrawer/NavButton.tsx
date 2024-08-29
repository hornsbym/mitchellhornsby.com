import { NavContext } from "@/app/contexts/navContext"
import { MouseEventHandler, useContext } from "react"

type NavButtonProps = {
    label: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>
    classNames?: ClassOverrides
}

type ClassOverrides = {
    container?: string
    button?: string
}

export const NavButton = ({
    label,
    onClick,
    classNames = {}
}: NavButtonProps) => {
    const {
        isNavOpen,
        setNavOpen
    } = useContext(NavContext)

    return (
        <li className={`w-full ${classNames.container ?? ''}`}>
            {/* When nav is closed, turn buttons in to text so they are removed from the tab flow */}
            <button
                className={`${isNavOpen ? 'flex' : 'hidden'} ${classNames.button ?? ''} p-4`}
                onClick={(e) => {
                    onClick(e)
                    setNavOpen(false)
                }}
            >
                {label}
            </button>
            <span
                className={`${isNavOpen ? 'hidden' : 'flex'} ${classNames.button ?? ''}`}
            >
                {label}
            </span>
        </li>
    )
}