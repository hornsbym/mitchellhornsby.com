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
        <li className={`flex flex-col w-full`}>
            {/* https://stackoverflow.com/a/35019847 */}
            <figure className={`${color} p-2`}>
                <figcaption className={`italic pb-1`}>{label}</figcaption>
                <ul className={`flex flex-col gap-1 py-2 px-8`}>
                    {children}
                </ul>
            </figure>
        </li>
    )
}