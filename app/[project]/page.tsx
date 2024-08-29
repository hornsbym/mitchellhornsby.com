export default function ProjectPage({ params }: { params: { project: string } }) {
    return <div>My project: {params.project}</div>
}