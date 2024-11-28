import Contact from "./sections/Contact";
import Landing from "./sections/Landing";
import Projects from "./sections/Projects/section";

export default function HomePage() {
    return (
        <>
            <Landing />
            <Projects />
            <Contact />
        </>
    );
}
