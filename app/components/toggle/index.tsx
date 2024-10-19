import { RiMoonFill, RiSunFill } from "react-icons/ri"

type ToggleProps = {
    toggled?: boolean
    onToggle: () => void
    size?: 'small' | 'medium' | 'large'
    label?: React.ReactNode
}

export default function Toggle({
    toggled = false,
    onToggle,
    size = 'medium',
    label
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
            className="flex flex-row gap-2 items-center"
            onClick={onToggle}
        >
            <div
                className={`
                    relative
                    flex
                    flex-row
                    gap-2
                    items-center
                    rounded-full
                    bg-white
                    ${container}
                `}
            >
                <div className={`
                        ${toggle}
                        absolute
                        transition-[left_translate]
                        duration-350
                        ease-out
                        aspect-square
                        rounded-full
                        p-[2px]
                        bg-black
                        ${toggled
                        ? 'left-0 translate-x-[0%] mx-2'
                        : 'left-[100%] translate-x-[-100%] -mx-2'}`
                }>
                    <div
                        className={`
                            flex
                            flex-row
                            justify-center
                            items-center
                            transition-colors
                            w-full
                            h-full
                            rounded-full
                            ${toggled
                                ? 'bg-zinc-600'
                                : 'bg-amber-400'}
                            `}>
                        {toggled ? <RiMoonFill className="text-white" /> : <RiSunFill className="text-black" />}
                    </div>
                </div>
            </div>
            {label}
        </button>
    )
} 