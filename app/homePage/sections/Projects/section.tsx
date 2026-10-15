'use client'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import ProjectTile from "./components/ProjectTile";
import { useState, ReactNode, useMemo } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { ORGANIZATIONS, PROJECTS } from "./config";

const PAGE_SIZE = 3

const FILTERS = [{ id: 'all', name: 'All' }, ...Object.values(ORGANIZATIONS)]

export default function Projects() {
    const [page, setPage] = useState(1)
    const [activeFilterIndex, setActiveFilterIndex] = useState(0)

    const filteredProjects = useMemo(() => {
        const activeOrgId = activeFilterIndex > 0 ? FILTERS[activeFilterIndex].id : undefined
        return PROJECTS
            .filter((p) => !activeOrgId || p.organization.id === activeOrgId)
            .sort((a, b) => b.startDate.localeCompare(a.startDate))
    }, [activeFilterIndex])

    const pageCount = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE))
    const pageProjects = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const paginationProps: PaginationProps = {
        page,
        pageCount,
        jumpToPage: setPage,
        hasNextPage: page < pageCount,
        hasPrevPage: page > 1
    }

    return (
        <section id="projects" className="pt-32">
            <SectionContainer>
                <div className="dm-text flex flex-1 flex-col items-center gap-16 w-full">
                    <h2 className={`max-w-[66%] text-5xl font-header text-center`}><u>Explore</u> My Work Experience</h2>
                    <div className="flex flex-col w-full items-center gap-8">
                        {/* Filter by organization */}
                        <div className="flex flex-row flex-wrap justify-center gap-2 text-xl font-primary">
                            {FILTERS.map((f, i) => (
                                <button
                                    key={f.id}
                                    onClick={() => {
                                        setActiveFilterIndex(i)
                                        setPage(1)
                                    }}
                                    className={`
                                        px-4
                                        py-2
                                        rounded-full
                                        border-2
                                        border-black
                                        dark:border-white
                                        ${activeFilterIndex === i ? 'bg-black text-white dark:bg-white dark:text-black' : ''}
                                    `}
                                >
                                    {f.name}
                                </button>))}
                        </div>
                        <Pagination {...paginationProps} />
                        {pageProjects.map((proj) => <ProjectTile key={proj.id} project={proj} />)}
                        <Pagination {...paginationProps} />
                    </div>
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