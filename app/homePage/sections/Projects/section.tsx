'use client'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import ProjectTile from "./components/ProjectTile";
import { useState, useEffect, ReactNode, useCallback } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine, RiLoader2Fill } from "react-icons/ri";
import { BsSortDown, BsSortUp } from "react-icons/bs";

type ProjectsData = {
    docs: [{ id: number }],
    hasNextPage: boolean,
    hasPrevPage: boolean,
    page: number,
    totalPages: number
}

type ProjectCategory = {
    id: number,
    name: string
}

export default function Projects() {
    const [loading, setLoading] = useState(true)
    const [projectsData, setProjectsData] = useState<ProjectsData | undefined>()
    const [sortAscending, setSortAscending] = useState(false)
    const [categories, setCategories] = useState<ProjectCategory[]>([{ id: -1, name: 'All' }])
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

    const jumpToPage = useCallback((pageNo: number) => {
        fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/getProjects`,
            {
                method: 'POST',
                body: JSON.stringify({
                    page: pageNo,
                    sortAscending: sortAscending,
                    category: activeCategoryIndex > 0 ? categories[activeCategoryIndex].id : undefined
                })
            }
        ).then(async (res) => {
            const { data: { Projects } } = await res.json()
            setProjectsData(Projects)
            setLoading(false)
        })
    }, [sortAscending, activeCategoryIndex])

    useEffect(() => {
        jumpToPage(1)
        fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/getProjectCategories`,
            {
                method: 'POST',
                body: JSON.stringify({})
            }
        ).then(async (res) => {
            const { data: { ProjectCategories: { docs } } } = await res.json()
            setCategories([...categories, ...docs])
        })
    }, [])

    useEffect(() => {
        if (projectsData) jumpToPage(projectsData.page)
    }, [sortAscending])

    useEffect(() => {
        if (projectsData) jumpToPage(1)
    }, [activeCategoryIndex])

    return (
        <section id="projects" className="pt-32">
            <SectionContainer>
                <div className="dm-text flex flex-1 flex-col items-center gap-16 w-full">
                    <h2 className={`max-w-[66%] text-2xl font-header text-center`}><u>Explore</u> My Recent Projects</h2>
                    {loading
                        ? (<RiLoader2Fill className="animate-spin text-[6rem] dark:text-white" />)
                        : (projectsData && (
                            <div className="flex flex-col w-full items-center gap-8">
                                {/* Filters */}
                                <div
                                    className={`flex flex-row flex-1 w-full justify-center text-xl font-primary gap-4`}
                                >
                                    {/* Filter by project type */}
                                    <div className="flex flex-row flex-wrap justify-center gap-2">
                                        {categories.map((c, i) => (
                                            <button
                                                key={c.id}
                                                onClick={() => { setActiveCategoryIndex(i) }}
                                                className={`
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    border-2
                                                    border-black
                                                    dark:border-white
                                                    ${activeCategoryIndex === i ? 'bg-black text-white dark:bg-white dark:text-black' : ''}
                                                `}
                                            >
                                                {c.name}
                                            </button>))}
                                    </div>
                                    {/* Sort by start date */}
                                    {/* <button
                                        onClick={() => {
                                            setSortAscending(!sortAscending)
                                        }}
                                        className={`
                                            rounded-full
                                            bg-black
                                            text-white
                                            dark:bg-white
                                            dark:text-black
                                            px-4
                                            py-2
                                            h-fit
                                    `}>
                                        {sortAscending
                                            ? <span className="flex flex-row gap-2 items-center">Oldest First <BsSortUp /></span>
                                            : <span className="flex flex-row gap-2 items-center">Newest First <BsSortDown /></span>}
                                    </button> */}
                                </div>
                                <Pagination
                                    page={projectsData.page}
                                    pageCount={projectsData.totalPages}
                                    jumpToPage={jumpToPage}
                                    hasNextPage={projectsData.hasNextPage}
                                    hasPrevPage={projectsData.hasPrevPage}
                                />
                                {projectsData.docs.map((proj, i) => <ProjectTile key={`${proj.id}-${i}`} {...proj} />)}
                                <Pagination
                                    page={projectsData.page}
                                    pageCount={projectsData.totalPages}
                                    jumpToPage={jumpToPage}
                                    hasNextPage={projectsData.hasNextPage}
                                    hasPrevPage={projectsData.hasPrevPage}
                                />
                            </div>
                        ))}
                </div>
            </SectionContainer>
        </section>

    );
}

type PaginationProps = {
    page: number,
    pageCount: number
    hasNextPage: boolean
    hasPrevPage: boolean
    jumpToPage: (num: number) => void
}

const Pagination = ({
    page,
    pageCount,
    hasNextPage,
    hasPrevPage,
    jumpToPage
}: PaginationProps) => {
    const pageMarkers: ReactNode[] = []
    for (let i = 1; i <= pageCount; i++) {
        pageMarkers.push(<li key={`proj-${i}`}><PageMarker page={i} active={page === i} jumpToPage={jumpToPage} /></li>)
    }
    return (
        <div className={`text-xl font-primary flex flex-row gap-4 sm:gap-12`}>
            <button
                onClick={() => jumpToPage(page - 1)}
                className={`${hasPrevPage ? "opacity-full" : 'opacity-0'}`}
                disabled={!hasPrevPage}
            >
                <RiArrowLeftSLine className="text-[1.5rem]" />
            </button>
            <ul className="flex flex-row gap-2">
                {pageMarkers}
            </ul>
            <button
                onClick={() => jumpToPage(page + 1)}
                className={`${hasNextPage ? "opacity-full" : 'opacity-0'}`}
                disabled={!hasNextPage}
            >
                <RiArrowRightSLine className="text-[1.5rem]" />
            </button>
        </div>
    )
}

type PageMarkerProps = {
    page: number
    active: boolean
    jumpToPage: (num: number) => void
}

const PageMarker = ({ page, active, jumpToPage }: PageMarkerProps) => {
    return (
        <button className={`
            rounded-full
            w-[2rem]
            h-[2rem]
            ${active ? `bg-black dark:bg-white text-white dark:text-black` : ``}
            hover:underline
            `} onClick={() => jumpToPage(page)}>
            {page}
        </button>
    )
}