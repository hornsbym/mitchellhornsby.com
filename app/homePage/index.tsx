import CareerTimeline from "./sections/CareerTimeline";
import Contact from "./sections/Contact";
import Landing from "./sections/Landing";
import SkillsSection from "./sections/Skills";

export default function HomePage() {
    return (
        <>
            <Landing />
            <SkillsSection />
            <CareerTimeline />
            <Contact />
        </>
    );
}
