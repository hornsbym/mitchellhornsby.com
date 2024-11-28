import "./ProjectTileDescriptionStyles.css"

type Props = {
    content: string
}

export default function ProjectTileDescription({ content }: Props) {
    return (
        <div className={`flex px-4 py-4`}>
            <div id="description_content" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
