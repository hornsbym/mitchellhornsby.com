import { RiLoader3Fill } from "react-icons/ri";
import ProjectTileDescription from "./ProjectTileDescription";
import { Dayjs } from "@/app/services/dayjs";
import { SocialLink } from "../../Landing";
import { BsArrowUpRight, BsBoxArrowUpRight, BsGithub, BsLink } from "react-icons/bs";


type Props = {
    id: number
}


export default async function ProjectTile({ id }: Props) {
    const project = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProject`,
        {
            method: 'POST',
            body: JSON.stringify({ projectId: id })
        }
    )
        .then(async (res) => {
            const { data: { Project: project } } = await res.json()
            return project
        })

    return (
        <div className={`flex flex-col w-full text-lg font-primary drop-shadow-dark max-w-[1024px]`}>
            {/* Project details */}
            <div
                className={`
                flex
                flex-1
                flex-col
                dark:bg-zinc-200
                dark:text-zinc-900
                bg-zinc-700
                text-zinc-100
                rounded-lg
                py-4
                px-6
                sm:py-8
                sm:px-12
        `}>
                <div className={`flex flex-row flex-wrap justify-between`}>
                    <h3 className="flex flex-1 flex-row text-2xl font-header items-end">{project.title}</h3>
                    <div className={`flex flex-row gap-4`}>
                        {
                            project.liveUrl && <SocialLink
                                link={project.liveUrl}
                                icon={<BsBoxArrowUpRight className="text-[1.5rem] !text-zinc-800 dark:!text-white" />}
                                className={`!bg-white dark:!bg-zinc-800 !w-12 !h-12`}
                            />
                        }
                        {
                            project.githubRepo && <SocialLink
                                link={project.githubRepo}
                                icon={<BsGithub className="text-[2rem] !text-zinc-800 dark:!text-white" />}
                                className={`!bg-white dark:!bg-zinc-800 !w-12 !h-12`}
                            />
                        }
                    </div>
                </div>
                <div className={`flex`}>
                    <p>{project.organization?.name}</p>
                </div>

                <p className="flex italic">{`
                    ${project.startDate ? Dayjs(project.startDate).format('MMM DD, YYYY') : ''}
                    ${project.startDate && project.endDate ? ' - ' : ''}
                    ${project.endDate ? Dayjs(project.endDate).format('MMM DD, YYYY') : ''}
                `}</p>
                <div className={`flex px-2 sm:px-4 py-2 sm:py-4`}>
                    <ProjectTileDescription content={project.description_html} />
                </div>
            </div>
            {/* Project skills */}
            <div className={`
            relative
            px-2
            sm:px-4
            z-[-1]
            flex
            flex-row
            flex-wrap
            text-lg
            `}>
                {project.skills.map((skill, i) => <SkillTag key={`${skill.id}`} {...skill} zIndex={i} />)}
            </div>
        </div>
    );
}

type SkillProps = {
    name: string
    tagColor: string
    tagFontColor: string
    zIndex: number
}

const SkillTag = ({ name, tagColor, tagFontColor, zIndex }: SkillProps) => {
    return (<div
        className={`
            relative
            flex
            flex-row
            px-4
            pb-2
            rounded-b-md
            font-bold
            pt-[129px]
            -mt-[125px]
        `}
        style={{
            backgroundColor: `#${tagColor}`,
            zIndex: `-${zIndex}`
        }}
    >
        <p style={{
            color: `#${tagFontColor}`
        }}>{name}</p>
    </div>)
}