import Contact from "./sections/Contact";
import Landing from "./sections/Landing";
import Projects from "./sections/Projects/section";

// TODO: Projects section is temporarily hidden while it's broken. Flip back to true once fixed.
const SHOW_PROJECTS = false;

export default function HomePage() {
    return (
        <>
            <Landing />
            {SHOW_PROJECTS && <Projects />}
            <Contact />
        </>
    );
}
