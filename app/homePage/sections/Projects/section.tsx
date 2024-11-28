'use client'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import ProjectTile from "./components/ProjectTile";
import { useState, useEffect } from "react";
import { RiLoader2Fill } from "react-icons/ri";

export default function Projects() {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState<[{ id: number }] | undefined>()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProjects`)
            .then(async (res) => {
                const { data: { Projects: { docs: projects } } } = await res.json()
                setProjects(projects)
                setLoading(false)
            })
    }, [])
    
    return (
        <section id="projects" className="pt-32">
            <SectionContainer>
                {loading
                    ? (<RiLoader2Fill className="animate-spin text-[6rem]" />)
                    : (projects && (<div className="dm-text flex flex-col gap-8">
                        <h2 className={`text-2xl font-header`}>Projects</h2>
                        <div className="flex flex-col items-center gap-8">
                            {projects.map((proj, i) => <ProjectTile key={`${proj.id}-${i}`} {...proj} />)}
                        </div>
                    </div>))
                }
            </SectionContainer>
        </section>

    );
}
