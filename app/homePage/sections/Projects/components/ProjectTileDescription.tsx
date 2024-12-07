import { ReactNode, useState } from "react";
import "./ProjectTileDescriptionStyles.css"
import { BsChevronBarContract, BsChevronBarExpand } from "react-icons/bs";

type Props = {
    content: string
}

export default function ProjectTileDescription({ content }: Props) {
    const [expanded, setIsExpanded] = useState(false)

    return (
        <div className={`flex flex-col px-4 py-4 gap-4 items-center`}>
            <div id="description_content" data-expanded={expanded} dangerouslySetInnerHTML={{ __html: content }} />
            <ExpandToggle label={expanded 
                ? <span className="flex flex-row gap-2 items-center">Hide details <BsChevronBarContract/></span> 
                : <span className="flex flex-row gap-2 items-center">Expand details <BsChevronBarExpand/></span>} 
                toggle={() => setIsExpanded(!expanded)} /> 
        </div>
    );
}

type ExpandToggleProps = {
    toggle: () => void
    label: ReactNode
}

const ExpandToggle = ({
    toggle,
    label
}: ExpandToggleProps) => {
    return (<button className="text-yellow-500 font-bold underline p-2 w-fit" onClick={toggle}>
        {label}
    </button>)
}