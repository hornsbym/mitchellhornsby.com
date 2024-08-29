import { NavContext } from "@/app/contexts/navContext"
import Link from "next/link"
import { useContext } from "react"
import { NavLink } from "./NavLink"

type NavSubMenuLinkProps = {
    label: React.ReactNode
    href: string
}

export const NavSubMenuLink = ({
    label,
    href
}: NavSubMenuLinkProps) => {
    return (
        <li className={`w-full`}>
            {/* When nav is closed, turn links in to text so they are removed from the tab flow */}
            <NavLink
                label={label}
                href={href}
            />
        </li>
    )
}