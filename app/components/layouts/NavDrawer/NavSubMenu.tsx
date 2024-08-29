type NavSubMenuProps = {
    label: React.ReactNode
    children: React.ReactNode
    color?: string // Should be tailwind background color
}

export const NavSubMenu = ({
    label,
    children,
    color = 'bg-gray-200',
}: NavSubMenuProps) => {
    return (
        <li className={`flex flex-col w-full px-2`}>
            {/* https://stackoverflow.com/a/35019847 */}
            <figure>
                <figcaption className={`italic py-2`}>{label}</figcaption>
                <ul className={`${color} px-2`}>
                    {children}
                </ul>
            </figure>
        </li>
    )
}