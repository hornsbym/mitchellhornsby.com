type SectionContainer = {
    children: React.ReactNode,
    className?: ClassOverrides
}

type ClassOverrides = {
    outer?: string
    inner?: string
}

export default function SectionContainer({
    children,
    className = {}
}: SectionContainer) {
    return (
        <div className={`
            flex
            flex-row
            w-full
            justify-center
            ${className.outer ?? ''}
            `}>
            <div
                className={`
                flex
                flex-col
                w-[91.67%]
                sm:w-[600px]
                md:w-[700px]
                lg:w-[950px]
                xl:w-[1250px]
                ${className.inner ?? ''}
            `}
            >
                {children}
            </div>
        </div>
    )
}