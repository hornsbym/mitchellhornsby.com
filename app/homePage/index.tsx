import CareerTimeline from "./sections/CareerTimeline";
import Contact from "./sections/Contact";
import Landing from "./sections/Landing";
import SkillsSection from "./sections/Skills";

export default function HomePage() {
    return (
        <>
            <Landing />
            <div className={`flex flex-col gap-32`}>
                <SkillsSection />
                <CareerTimeline />
                <Contact />
            </div>

        </>
    );
}
