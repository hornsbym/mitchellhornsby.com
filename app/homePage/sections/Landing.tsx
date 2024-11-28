'use client'
import Image from "next/image";
import profile_pic from '@/public/profile_pic_cropped.jpg'
import { Typewriter } from 'react-simple-typewriter'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import NcLogo from '@/public/nc_logo.svg'
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Landing() {
    const typewriterProps = {
        loop: true,
        cursor: true,
        cursorBlinking: true,
        cursorStyle: '_',
        words: [
            'Mitchell Hornsby',
            'a software engineer',
            'based in northern California',
            'originally from Georgia',
            'looking for work!',
            'a former college athlete',
            'probably on a mountain'
        ]
    }

    return (
        <SectionContainer>
            <section
                className="
                flex
                flex-col
                justify-center
                pt-32

                items-center
                w-full
                aspect-[7/6]
                md:aspect-[7/4]
                lg:aspect-[7/3]
                xl:aspect-[16/5]
                "
                id="home"
            >
                <div className={`
                    flex
                    flex-col
                    px-8
                    py-12
                    gap-16
                    lg:gap-8
                    justify-center
                    items-center
                    bg-white/60
                    dark:bg-zinc-900/60
                    rounded-lg
                `}>
                    <div className="
                        flex
                        flex-col
                        gap-8
                        w-full
                        max-w-[750px]
                        items-center
                        flex-1
                    ">
                        <div
                            className="w-fit rounded-full border-black dark:border-white border-8 drop-shadow-dark "
                        >
                            <Image
                                src={profile_pic}
                                alt="Portrait of Mitchell Hornsby standing in front of a snowy landscape at Yosemite National Park."
                                className="rounded-full aspect-square object-cover"
                                priority
                            />
                        </div>
                        <h1 className="dm-text text-3xl h-[5rem] font-body text-left w-3/4 sm:w-1/2">{`Hi, I'm `}<span className="font-bold font-header"><Typewriter {...typewriterProps} /></span></h1>
                    </div>
                    <div className="flex flex-row gap-4">
                        <SocialLink
                            link={"https://github.com/hornsbym/"}
                            icon={<BsGithub className="text-[2.5rem]" />}
                        />
                        <SocialLink
                            link={"https://www.linkedin.com/in/mitchellhornsby/"}
                            icon={<BsLinkedin className="text-[2.25rem]" />}
                        />
                        <SocialLink
                            link={"https://novelconcept.studio"}
                            icon={<Image className="fill-white invert dark:invert-0" src={NcLogo} alt="Novel Concept Studio" />}
                            className="!p-3"
                        />
                    </div>
                    <div className="
                        relative
                        flex
                        md:flex-1
                        w-none
                        flex-col
                        gap-8
                        dm-text
                        items-center
                        text-lg
                        text-left
                        max-w-[750px]
                        "
                    >
                        <div className="flex flex-col gap-4">
                            <p>{`I'm a full-stack software engineer that's particularly experienced in frontend development. I've professionally contributed to every aspect of both web app and cross-platform mobile app development, from the UI to the database. I've worked with both massive corporations and starups; I pride myself on being a flexible and tenacious problem solver.`}</p>
                            <p>{`I've begun providing freelance web development services to small businesses through my web development studio, `}<a className="hover:no-underline underline dark:text-yellow-400 text-yellow-700" href="https://novelconcept.studio">{`Novel Concept Studio`}</a>{`. Novel Concept Studio aims to provide small businesses with affordable web design, development, and hosting services.`}</p>
                            <p>{`Please reach out! I'm always eager to expand my network. You can DM me through LinkedIn or email me directly at `}<a className="hover:no-underline underline dark:text-yellow-400 text-yellow-700" href="mailto:mitchellrh78@gmail.com">{`mitchellrh78@gmail.com`}</a>{`, or fill out the `}<a className="hover:no-underline underline dark:text-yellow-400 text-yellow-700" href="/#contact">contact form</a>{` at the bottom of this page.`}</p>
                        </div>
                    </div>
                </div>

            </section>
        </SectionContainer>

    );
}

type SocialLinkProps = {
    link: string
    icon: React.ReactNode,
    className?: string
}

export const SocialLink = ({
    link,
    icon,
    className
}: SocialLinkProps) => {
    return (<a
        className={`
            flex
            flex-row
            justify-center
            items-center
            dm-text-inverse
            bg-zinc-900
            dark:bg-white
            scale-1
            hover:scale-[110%]
            p-2
            w-16
            h-16
            rounded-full
            drop-shadow-dark
            ${className ?? ''}
            `}
        href={link}
        target='_blank'
    >
        {icon}
    </a>)
}
