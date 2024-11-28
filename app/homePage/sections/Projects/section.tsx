'use client'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import { gql, useQuery } from "@apollo/client";
import { RiLoader2Line } from "react-icons/ri";
import ProjectTile from "./components/ProjectTile";

const GET_PROJECTS = gql`
{
    Projects (limit: 50, sort: "-startDate") {
        docs {
            id
        }
    } 
}
`

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    return (
        <section id="projects" className="pt-32">
            <SectionContainer>
                <div className="dm-text flex flex-col gap-8">
                    <h2 className={`text-2xl font-header`}>Projects</h2>
                    <div className="flex flex-col items-center gap-8">
                        {
                            loading
                                ? (<RiLoader2Line className="animate-spin text-[5rem]" />)
                                : error
                                    ? (<p className={`text-lg font-primary`}>Sorry, something went wrong. Please try again in a little bit.</p>)
                                    : (data.Projects.docs.map((proj, i) => <ProjectTile key={`${proj.id}-${i}`} {...proj} />))
                        }
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}
