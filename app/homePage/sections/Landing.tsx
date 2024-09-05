'use client'
import Image from "next/image";
import profile_pic from '@/public/profile_pic_cropped.jpg'
import { Typewriter } from 'react-simple-typewriter'
import { RiInstagramLine, RiLinkedinBoxFill } from "react-icons/ri";
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import NcLogo from '@/public/nc_logo.svg'

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
                md:flex-row
                justify-center
                pt-32
                gap-16
                lg:gap-8
                items-center
                w-full
                aspect-[7/6]
                md:aspect-[7/4]
                lg:aspect-[7/3]
                xl:aspect-[16/5]"
                id="home"
            >
                <div className="
                    flex
                    flex-col
                    gap-8
                    w-full
                    items-center
                    flex-1"
                >
                    <div
                        className="w-fit rounded-full border-black dark:border-white border-8 drop-shadow-light dark:drop-shadow-dark"
                    >
                        <Image
                            src={profile_pic}
                            alt="Portrait of Mitchell Hornsby standing in front of a snowy landscape at Yosemite National Park."
                            className="rounded-full aspect-square object-cover"
                            priority
                        />
                    </div>
                    <h1 className="dm-text text-3xl h-[5rem] font-body text-center w-3/4 sm:w-1/2">{`Hi, I'm `}<span className="font-bold font-header"><Typewriter {...typewriterProps} /></span></h1>
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
                    text-center"
                >
                    <div className="flex flex-col gap-4">
                        <p>{`I'm a full-stack engineer, with a slight preference for front-end development. I have a Computer Science degree from Washington and Lee University and 6+ years of experience building web and mobile applications.`}</p>
                        <p>{`I recently founded the web design & development studio, `}<a className="hover:no-underline underline dark:text-yellow-400 text-sky-600" href="https://novelconcept.studio">{`Novel Concept Studio`}</a>{`. Novel Concept Studio aims to provide small businesses with affordable web design, development, and hosting services.`}</p>
                        <p>{`Feel free to reach out! You can DM me through LinkedIn or Instagram, email me directly at `}<a className="hover:no-underline underline dark:text-yellow-400 text-sky-600" href="mailto:mitchellrh78@gmail.com">{`mitchellrh78@gmail.com`}</a>{`, or fill out the `}<a className="hover:no-underline underline dark:text-yellow-400 text-sky-600" href="/#contact">contact form</a>{` at the bottom of this page.`}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <SocialLink
                            link={"https://www.instagram.com/mitchellrh78/"}
                            icon={<RiInstagramLine className="text-[2.5rem]" />}
                        />
                        <SocialLink
                            link={"https://www.linkedin.com/in/mitchellhornsby/"}
                            icon={<RiLinkedinBoxFill className="text-[2.5rem]" />}
                        />
                        <SocialLink
                            link={"https://novelconcept.studio"}
                            icon={<Image className="fill-white invert dark:invert-0" src={NcLogo} alt="Novel Concept Studio" />}
                            className="!p-3"
                        />
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

const SocialLink = ({
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
            bg-sky-900
            dark:bg-white
            scale-1
            hover:scale-125
            p-2
            w-16
            h-16
            rounded-full
            drop-shadow-light
            dark:drop-shadow-dark
            ${className ?? ''}
            `}
        href={link}
        target='_blank'
    >
        {icon}
    </a>)
}
