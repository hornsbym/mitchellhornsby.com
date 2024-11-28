import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import ProjectTile from "./components/ProjectTile";

export default async function Projects() {
    const projects = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getProjects`)
        .then(async (res) => {
            const { data: { Projects: { docs: projects } } } = await res.json()
            return projects
        })

    return (
        <section id="projects" className="pt-32">
            <SectionContainer>
                <div className="dm-text flex flex-col gap-8">
                    <h2 className={`text-2xl font-header`}>Projects</h2>
                    <div className="flex flex-col items-center gap-8">
                        {projects.map((proj, i) => <ProjectTile key={`${proj.id}-${i}`} {...proj} />)}
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}
