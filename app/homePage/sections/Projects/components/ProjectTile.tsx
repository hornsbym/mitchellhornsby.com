'use client'
import { gql, useQuery } from "@apollo/client";
import { RiLoader3Fill } from "react-icons/ri";
import ProjectTileDescription from "./ProjectTileDescription";
import { Dayjs } from "@/app/services/dayjs";
import { SocialLink } from "../../Landing";
import { BsArrowUpRight, BsBoxArrowUpRight, BsGithub, BsLink } from "react-icons/bs";


type Props = {
    id: number
}

const GET_PROJECT = (id: number) => gql`
{
    Project(id: ${id.toString()}) {
        title
        organization {
            name
        }
        skills {
            id
            name
            tagColor
            tagFontColor
        }
        startDate
        endDate
        description_html
        liveUrl
        githubRepo
    } 
}
`

export default function ProjectTile({ id }: Props) {
    const { loading, error, data } = useQuery(GET_PROJECT(id));

    return (
        <>
            {
                loading
                    ? (<RiLoader3Fill className={`animate-spin text-[3rem]`} />)
                    : error
                        ? (<></>)
                        : (
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
                                        <h3 className="flex flex-1 flex-row text-2xl font-header items-end">{data.Project.title}</h3>
                                        <div className={`flex flex-row gap-4`}>
                                            {
                                                data.Project.liveUrl && <SocialLink
                                                    link={data.Project.liveUrl}
                                                    icon={<BsBoxArrowUpRight className="text-[1.5rem] !text-zinc-800 dark:!text-white" />}
                                                    className={`!bg-white dark:!bg-zinc-800 !w-12 !h-12`}
                                                />
                                            }
                                            {
                                                data.Project.githubRepo && <SocialLink
                                                    link={data.Project.githubRepo}
                                                    icon={<BsGithub className="text-[2rem] !text-zinc-800 dark:!text-white" />}
                                                    className={`!bg-white dark:!bg-zinc-800 !w-12 !h-12`}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className={`flex`}>
                                        <p>{data.Project.organization?.name}</p>
                                    </div>

                                    <p className="flex italic">{`
                                            ${data.Project.startDate ? Dayjs(data.Project.startDate).format('MMM DD, YYYY') : ''}
                                            ${data.Project.startDate && data.Project.endDate ? ' - ' : ''}
                                            ${data.Project.endDate ? Dayjs(data.Project.endDate).format('MMM DD, YYYY') : ''}
                                        `}</p>
                                    <div className={`flex px-2 sm:px-4 py-2 sm:py-4`}>
                                        <ProjectTileDescription content={data.Project.description_html} />
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
                                    {data.Project.skills.map((skill, i) => <SkillTag key={`${skill.id}`} {...skill} zIndex={i} />)}
                                </div>
                            </div>
                        )
            }
        </>
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