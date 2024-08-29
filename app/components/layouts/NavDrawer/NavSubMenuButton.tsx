import { NavContext } from "@/app/contexts/navContext"
import { MouseEvent, MouseEventHandler, useContext } from "react"
import { NavButton } from "./NavButton"

type NavSubMenuButtonProps = {
    label: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>
}

export const NavSubMenuButton = ({
    label,
    onClick
}: NavSubMenuButtonProps) => {
    return (
        <li className={`bg-gray-200 w-full p-2`}>
            {/* When nav is closed, turn buttons in to text so they are removed from the tab flow */}
            <NavButton
                label={label}
                onClick={onClick}
            />

        </li>
    )
}