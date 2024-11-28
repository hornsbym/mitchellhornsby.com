'use client'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import { MONTHS } from "@/constants/months";
import React from "react";
import { useState } from "react";
import { RiArrowUpLine, RiArticleLine, RiCalendarCheckFill, RiCalendarEventFill, RiCalendarScheduleLine, RiCheckFill, RiFlag2Fill, RiFlagFill, RiFlagLine, RiPinyinInput, RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";

export default function CareerTimeline() {
    return (
        <section className="pt-32">
            <SectionContainer>
                <div className={`flex flex-col gap-8 dm-text`}>
                    <h2 className={`text-2xl font-header`}>Career Milestones</h2>
                    <div className="flex flex-col w-full">
                        <Timeline
                            stops={TimelineItems}
                        />
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

type TimelineStopIconProps = {
    color: string
    icon?: React.ReactNode
}

const TimelineStopIcon = ({
    color,
    icon
}: TimelineStopIconProps) => {
    return (
        <div className={`${color} flex flex-row flex-none justify-center items-center w-8 aspect-square rounded-full`}>
            {icon ? icon : ''}
        </div>
    )
}

type TimelineProps = {
    stops: TimelineStopProps[]
}

const Timeline = ({
    stops
}: TimelineProps) => {
    const sortedStops = stops.sort((stopA, stopB) => {
        if (stopA.date.begin > stopB.date.begin) return -1
        else if (stopA.date.begin < stopB.date.begin) return 1
        else return 0
    })
    return (
        <div className={`flex flex-col items-start w-full gap-[2px] px-2 sm:px-8 lg:px-16`}>
            {/* Today's date */}
            <div className="flex flex-row items-center gap-2 ml-[8px]">
                <TimelineStopIcon
                    color={"bg-black dark:bg-white !w-12"}
                    icon={<RiCalendarCheckFill
                        className="text-2xl dm-text-inverse"
                    />}
                />
                <p>{`${MONTHS[(new Date()).getMonth()]}, ${(new Date()).getFullYear()}`}</p>
            </div>
            <TimelineSpacer className="flex-none h-24 !border-black dark:!border-white !ml-[31px]" />

            {/* Timeline content */}
            {sortedStops.map((s, i) => {
                return (<React.Fragment key={`${s.title}-${i}`}>
                    <TimelineStop {...s} />
                    {(i + 1 !== stops.length) && (
                        <TimelineSpacer className="flex-none !border-black dark:!border-white h-16 !ml-[31px]" />
                    )}
                </React.Fragment>)
            })}


            {/* Start date */}
            <TimelineSpacer className="flex-none h-24 !border-black dark:!border-white !ml-[31px]" />
            <div className="flex flex-row gap-2 ml-[8px] items-center">
                <TimelineStopIcon
                    color={"bg-black dark:bg-white !w-12"}
                    icon={<RiCalendarEventFill
                        className="text-2xl dm-text-inverse"
                    />}
                />
                <p>{`July, 2018`}</p>
            </div>
        </div>
    )
}


type TimelineStopProps = {
    icon: React.ReactNode
    color: string
    date: {
        begin: Date,
        end?: Date
    }
    title: React.ReactNode
    description: React.ReactNode
}

const TimelineStop = ({
    icon,
    date,
    color,
    title,
    description
}: TimelineStopProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className={`${color} px-4 rounded-xl flex flex-row gap-4 w-full justify-center dm-text-inverse drop-shadow-dark `}>
            <div className="flex flex-col md:flex-1">
                {/* Top spacer */}
                <TimelineSpacer className="flex-none h-6" />
                {
                    date.end && (
                        <>
                            {/* End date icon */}
                            <div className="flex flex-row gap-4 items-center">
                                {icon}<p className="hidden md:flex">{`${MONTHS[date.end.getMonth()]}, ${date.end.getFullYear()}`}</p>
                            </div>
                            {/* Middle spacer */}
                            <TimelineSpacer />
                        </>
                    )
                }
                {/* Start date icon */}
                <div className="flex flex-row gap-4 items-center">
                    {icon}<p className="hidden md:flex">{`${MONTHS[date.begin.getMonth()]}, ${date.begin.getFullYear()}`}</p>
                </div>
                {/* Bottom spacer */}
                {
                    !date.end ? (<TimelineSpacer />) : (<TimelineSpacer className="flex-none h-6" />)
                }
            </div>
            <div className={`flex flex-col md:flex-[3] gap-4 w-full py-1 p-2`}>
                <p className="flex md:hidden mt-4">{`${MONTHS[date.begin.getMonth()]}, ${date.begin.getFullYear()}`}</p>
                <div className="flex flex-1 flex-col py-8 gap-6">
                    <div>{title}</div>
                    {
                        isExpanded && <div>{description}</div>
                    }
                    <button
                        className="underline italic text-lg hover:cursor-pointer w-fit"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ?
                            (<span className={`flex flex-row gap-2 items-center`}>
                                Collapse article <RiArrowUpLine />
                            </span>) :
                            (<span className={`flex flex-row gap-2 items-center`}>
                                Expand article <RiArticleLine />
                            </span>)}
                    </button>
                </div>
                {
                    date.end && (<p className="flex md:hidden mb-4">{`${MONTHS[date.end.getMonth()]}, ${date.end.getFullYear()}`}</p>)
                }
            </div>
        </div>
    )
}

const TimelineSpacer = ({ className }: { className?: string }) => {
    return (<div className={`flex flex-1 min-h-4 border-l-2 border-white dark:border-black ml-[15px] ${className ?? ''}`} />
    )
}

const TimelineItems = [
    {
        icon: <TimelineStopIcon color="bg-yellow-400"
            icon={<RiPushpin2Fill className="text-black text-xl" />}
        />,
        color: 'dark:bg-white bg-zinc-900',
        date: {
            begin: new Date(2018, 5, 1),
            end: new Date(2018, 8, 1),
        },
        title: <span className="text-lg">
            <h3 className="text-xl italic">Techology Intern</h3>
            <p>Sapient Razorfish</p>
            <p>{`Atlanta, GA`}</p>
        </span>,
        description: <div className={`flex flex-col gap-2`}>
            <p>
                {`Before the summer of 2018, I had the good fortunate of securing an internship with Sapient Razorfish at their Atlanta office.`}
            </p>
            <p>
                {`I was put on a team with three other technology interns. Our task for the summer was to devlop a proof-of-concept "magic mirror" display to be used in a commercial setting.`}
            </p>
            <p>
                {`The project was broken down into three main components: frontend, backend, and hardware development. I primarily contriubted to the magic mirror's UI on the frontend, but I also made some contributions to the backend portions of the work.`}
            </p>
            <p>
                {`This was my first exposure to React and NodeJS (using Express). It was a big step up from the vanilla HTML, CSS, and in-browser Javascript I was learning in my college classes. Until I had the opportunity to try Next`}
            </p>
            <p>
                {`Until I had the opportunity to try NextJS, React and Express would be my go-to tech stack for future projects.`}
            </p>
        </div>
    },
    {
        icon: <TimelineStopIcon color="bg-yellow-400"
            icon={<RiPushpin2Fill className="text-black text-xl" />}
        />,
        color: 'dark:bg-white bg-zinc-900',
        date: {
            begin: new Date(2019, 4, 1),
        },
        title: <span className="text-lg">
            <h3 className="text-xl italic">Graduated College</h3>
            <p>Washington and Lee University</p>
            <p>{`Lexington, VA`}</p>
        </span>,
        description: <div className={`flex flex-col gap-2`}>
            <p>
                {`I graduated from Washington and Lee University with a BA in Computer Science and a minor in Creative Writing. `}
            </p>
            <p>
                {`Outside of academic work, I played varsity football. Over the four seasons I played for the football team, we won two Old Dominion Athletic Conference (ODAC) championships. I was on the starting lineup each season, and served as captain my senior year. I also won the offensive MVP award my senior year.`}
            </p>
            <p>
                {`In addition to athletics and academics, I also served as a resident advisor and worked part time for the university store.`}
            </p>
        </div>
    },
    {
        icon: <TimelineStopIcon color="bg-yellow-400"
            icon={<RiPushpin2Fill className="text-black text-xl" />}
        />,
        color: 'dark:bg-white bg-zinc-900',
        date: {
            begin: new Date(2019, 5, 1),
            end: new Date(2023, 4, 1),
        },
        title: <span className="text-lg">
            <h3 className="text-xl italic">Associate Software Developer</h3>
            <p>{`Publicis Sapient (fka Sapient Razorfish)`} </p>
            <p>{`Atlanta, GA; San Francisco, CA`}</p>
        </span>,
        description: <div className={`flex flex-col gap-2`}>
            <p>
                {`During my senior year, Sapient Razorfish (now known as Publicis Sapient) offered me a full-time position as a software developer. I accepted, and began working for them the following summer.`}
            </p>
            <p>
                {`Publicis Sapient gave me a ton of practical experience with web development. I didn't know what I wanted to do going in, so I tried a little bit of everything while working there. `}
            </p>
            <p>
                {`Here's a brief summary of the projects I worked on while at PS:`}
            </p>
            <ul className="list-disc pl-12">
                <li>{`Internal: Android app development training (Kotlin/Android Studio)`}</li>
                <li>{`Pilot Flying J account: Maintained a suite of functional mobile tests (Appium)`}</li>
                <li>{`Internal: Put together a demo cross-platform mobile app (Dart/Flutter) to be used in a sales pitch for Howard Hughes`}</li>
                <li>{`Internal: Developed a functional cross-platform mobile app (Dart/Flutter) encourage networking within PS`}</li>
                <li>{`Verison account: Executed speed and performance tests (Google Lighthouse) on various pages of their website`}</li>
                <li>{`Marriott account: Created and maintained several backend microservices (Springbook/Kafka) for their Homes and Villas website`}</li>
                <li>{`Marriott account: Built and maintained several pages and UI components used on their Homes and Villas website (React/GraphQL)`}</li>
                <li>{`Mayo Clinic account: Created a cross-platform mobile app (React Native) to survey upper-digestive surgery patients`}</li>
                <li>{`Mayo Clinic account: Contributed to their patient mobile app (React Native) and website (NextJS)`}</li>
            </ul>
            <p>
                {`My career at Publicis was marked by flexibility and adaptability. I eagerly jumped on to any team that needed help, even if I was unfamiliar with the technologies the team was using.`}
            </p>
        </div>
    },
    {
        icon: <TimelineStopIcon
            color="bg-yellow-400"
            icon={<RiPushpin2Fill className="text-black text-xl" />}
        />,
        color: 'dark:bg-white bg-zinc-900',
        date: {
            begin: new Date(2023, 4, 1),
            end: new Date(2024, 4, 1),
        },
        title:
            <span className="text-lg">
                <h3 className="text-xl italic">Senior Software Engineer</h3>
                <p>{`Nxu Technology`} </p>
                <p>{`Tempe, AZ`}</p>
            </span>,
        description: <div className={`flex flex-col gap-2`}>
            <p>
                {`After four years with Publicis, I was ready for a change.`}
            </p>
            <p>
                {`Nxu was a late-stage electric vehicle charging startup. When I first joined, Nxu had two projects they were pursuing: battery pack manufacturing and fast EV charging stations.`}
            </p>
            <p>
                {`I was placed on the charging station team. I had three areas of responsibility: developing the charging station admin panel (NextJS/PostgreSQL), writing microservices to facilitate starting and stopping charging sessions (AWS Lambda/IoT), and updating the marketing website (React/Builder.io).`}
            </p>
            <p>
                {`Within my first few months, the charging team successfully put together a charging station prototype. After thorough testing, we opened up the charging station team to the public and began generating revenue from the prototype as part of a limited alpha release.`}
            </p>
            <p>
                {`We had an aggressive company goal of quickly beta releasing our second prototype version. To meet this goal, I was asked to help out with the development of the web and mobile consumer mobile apps. I gladly did so, and the cross-platform charging app (React Native) was released in time for our beta launch.`}
            </p>
            <p>
                {`Unfortunately, market conditions forced Nxu to layoff the majority of the company shortly after the beta launch.`}
            </p>
            <p>
                {`As of August, 2024, the projects I worked on at Nxu were still publicly reachable:`}
            </p>
            <ul className="list-disc pl-12">
                <li>
                    <a
                        className={`underline`}
                        href="https://www.nxuenergy.com/">{`Marketing website`}</a>
                </li>
                <li>
                    <a
                        className={`underline`}
                        href={`https://admin.charging.nxuenergy.com/`}>{`Charging station admin panel`}</a>
                </li>

                <li>
                    <a
                        className={`underline`}
                        href={`https://charging.nxuenergy.com/`}>{`NxuOne consumer web app`}</a>{``}
                </li>
                <li>
                    <a
                        className={`underline`}
                        href="https://play.google.com/store/apps/details?id=com.nxu.chargingreactnativeapp&hl=en_US">{`NxuOne app`}</a>{` (Android)`}
                </li>
                <li>
                    <a
                        className={`underline`}
                        href="https://apps.apple.com/us/app/nxuone/id6476523186">{`NxuOne app`}</a>{` (IOS)`}
                </li>
            </ul>
        </div>
    },
    {
        icon: <TimelineStopIcon color="bg-yellow-400"
            icon={<RiPushpin2Fill className="text-black text-xl" />}
        />,
        color: 'dark:bg-white bg-zinc-900',
        date: {
            begin: new Date(2024, 5, 1),
        },
        title: <span className="text-lg">
            <h3 className="text-xl italic">{`Owner & Software Engineer`}</h3>
            <p>{`Novel Concept Studio`} </p>
            <p>{`Mi Wuk Village, CA`}</p>
        </span>,
        description: <div className={`flex flex-col gap-2`}>
            <p>
                {`I decided to use my new-found free time to form my own web design and development business, Novel Concept Studio. My business aims to develop free or low-cost websites for small businesses.`}
            </p>
        </div>
    },
]