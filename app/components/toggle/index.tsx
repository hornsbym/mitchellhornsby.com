type ToggleProps = {
    toggled?: boolean
    onToggle: () => void
    size?: 'small' | 'medium' | 'large'
}

export default function Toggle({
    toggled = false,
    onToggle,
    size = 'medium'
}: ToggleProps) {
    const {
        container,
        toggle,
    } = (() => {
        let container, toggle = ''

        switch (size) {
            case 'small':
                container = 'w-16 h-8'
                toggle = 'w-6 h-6'
                break;
            case 'medium':
                container = 'w-24 h-12'
                toggle = 'w-10 h-10'
                break;
            case 'large':
                container = 'w-36 h-12'
                toggle = 'w-8 h-8'
                break;
        }
        return {
            container,
            toggle
        }
    })()

    return (
        <button
            className={`
                relative
                flex
                flex-row
                items-center
                rounded-full
                bg-white
                ${container}
            `}
            onClick={onToggle}
        >
            <div className={`
                ${toggle}
                transition-[left_translate]
                duration-350
                ease-out
                aspect-square
                rounded-full
                absolute
                p-[2px]
                bg-black
                ${toggled
                    ? 'left-0 translate-x-[0%] mx-2'
                    : 'left-[100%] translate-x-[-100%] -mx-2'}`
            }
            >
                <div
                    className={`
                        transition-colors
                        w-full
                        h-full
                        rounded-full
                        ${toggled
                            ? 'bg-black'
                            : 'bg-sky-200'}
            `}>
                </div>
            </div>
        </button>
    )
} 