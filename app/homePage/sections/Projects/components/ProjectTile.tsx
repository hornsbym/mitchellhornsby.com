'use client'
import ProjectTileDescription from "./ProjectTileDescription";
import { Dayjs } from "@/app/services/dayjs";
import { SocialLink } from "../../Landing";
import { BsBoxArrowUpRight, BsGithub } from "react-icons/bs";
import { useEffect, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { TriggerContainer } from "@/app/components/effects/TriggerContainer";

type Props = {
    id: number
}

type Project = {
    title: string
    organization: {
        name: string
    }
    skills: {
        id: string
        name: string
        tagColor: string
        tagFontColor: string
    }[]
    projectCategory: {
        id: string
        name: string
        tagColor: string
        tagFontColor: string
    }
    startDate: string
    endDate: string
    description_html: string
    liveUrl: string
    githubRepo: string
}

export default function ProjectTile({ id }: Props) {
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState<Project | undefined>()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProject`,
            {
                method: 'POST',
                body: JSON.stringify({ projectId: id })
            }
        )
            .then(async (res) => {
                const { data: { Project: project } } = await res.json()
                setProject(project)
                setLoading(false)
            })
    }, [])

    return (<>
        {
            loading
                ? (<RiLoader4Fill className="animate-spin text-[4rem] dark:text-white" />)
                : (project && (
                    <TriggerContainer
                        classNames={{
                            container: 'flex flex-row justify-center w-full'
                        }}
                        type="group-visibility"
                        offset="-175px 0px"
                        createGroup={(trigger) => {
                            return (
                                <div className={`flex flex-col w-full text-lg font-primary drop-shadow-dark max-w-[1024px]`}>
                                    {/* Project category */}
                                    <div className={`
                                        relative
                                        px-2
                                        sm:px-4
                                        z-[-1]
                                        flex
                                        flex-row
                                        justify-stretch
                                        sm:justify-start
                                        flex-wrap
                                        text-lg
                                        `}>
                                        <ProjectCategoryTag {...project.projectCategory} tileTrigger={trigger} />
                                    </div>
                                    <div className="       
                                        relative                         
                                        flex
                                        flex-1
                                        flex-col
                                        dark:bg-zinc-200
                                        dark:text-zinc-900
                                        bg-zinc-700
                                        text-zinc-100
                                        rounded-lg
                                    ">
                                        <div className="absolute w-full h-full bg-graph-paper dark:bg-graph-paper-light"></div>
                                        {/* Project details */}
                                        <div
                                            className={`
                                                relative
                                                z-[1]
                                                flex
                                                flex-1
                                                flex-col
                                                py-4
                                                px-6
                                                sm:py-8
                                                sm:px-12
                                        `}>
                                            <div className={` flex flex-row flex-wrap justify-between`}>
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
                                            <p className="flex italic">
                                                {`
                                        ${project.startDate ? Dayjs(project.startDate).format('MMM DD, YYYY') : ''}
                                        ${project.startDate && project.endDate ? ' - ' : ''}
                                        ${project.endDate ? Dayjs(project.endDate).format('MMM DD, YYYY') : ''}
                                    `}
                                            </p>
                                            <div className={`flex px-2 sm:px-4 py-2 sm:py-4`}>
                                                <ProjectTileDescription content={project.description_html} />
                                            </div>
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
                                        justify-stretch
                                        sm:justify-start
                                        flex-wrap
                                        text-lg
                                    `}>
                                        {project.skills.map((skill, i) => <SkillTag
                                            key={`${skill.id}`}
                                            {...skill}
                                            zIndex={i}
                                            transitionOrder={project.skills.length - i}
                                            tileTrigger={trigger} />)}
                                    </div>
                                </div>
                            )
                        }}
                    />

                ))
        }
    </>
    );
}

type SkillProps = {
    name: string
    tagColor: string
    tagFontColor: string
    zIndex: number
    tileTrigger: boolean
    transitionOrder: number
}

const SkillTag = ({ name, tagColor, tagFontColor, zIndex, tileTrigger, transitionOrder }: SkillProps) => {
    return (
        <div className={`
            relative
            flex
            flex-1
            sm:flex-initial
            flex-row
            items-end
            h-[2.5rem]
        `}
            style={{
                zIndex: `-${zIndex}`,
                transitionDelay: `${transitionOrder * 75}ms`
            }}
        >
            <div
                className={`
                    relative
                    transition-translate
                    ease-out
                    ${tileTrigger ? '' : '-translate-y-[100%]'}
                    duration-[500ms]
                    flex
                    flex-1
                    sm:flex-initial
                    flex-row
                    justify-center
                    items-end
                    px-4
                    pb-2
                    rounded-b-2xl
                    font-bold
                    h-[8rem]
                    overflow-y-clip
            `}
                style={{
                    backgroundColor: `#${tagColor}`,
                    transitionDelay: `${transitionOrder * 75}ms`
                }}
            >
                <p className="flex flex-0 text-nowrap" style={{
                    color: `#${tagFontColor}`
                }}>{name}</p>
            </div>
        </div>
    )
}

type ProjectCategoryProps = {
    name: string
    tagColor: string
    tagFontColor: string
    tileTrigger: boolean
}

const ProjectCategoryTag = ({ name, tagColor, tagFontColor, tileTrigger }: ProjectCategoryProps) => {
    return (
        <div className={`
            relative
            flex
            flex-1
            sm:flex-initial
            flex-row
            items-end
            h-[2.5rem]
        `}
        ><div
            className={`
                relative
                transition-translate
                ease-out
                ${tileTrigger ? '' : 'translate-y-[100%]'}
                duration-[500ms]
                flex
                flex-1
                sm:flex-initial
                flex-row
                justify-center
                items-start
                px-4
                pt-2
                rounded-t-2xl
                font-bold
                h-[2.5rem]
                overflow-y-clip
        `}
            style={{
                backgroundColor: `#${tagColor}`,
            }}
        >
                <p className="flex flex-0 text-nowrap underline" style={{
                    color: `#${tagFontColor}`
                }}>{name}</p>
            </div>
        </div>)
}