'use client'
import SectionContainer from "@/app/components/layouts/SectionContainer/SectionContainer";
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

const Skills: SkillGaugeProps[] = [
    {
        skill: "Javascript/Typescript",
        experienceLevel: 4,
        interestLevel: 4,
        yearsExperience: 6,
        coursesTaken: 2,
        projectsCompleted: 10
    },
    {
        skill: "React",
        experienceLevel: 4,
        interestLevel: 5,
        yearsExperience: 6,
        projectsCompleted: 10
    },
    {
        skill: "Tailwind",
        experienceLevel: 4,
        interestLevel: 5,
        yearsExperience: 3,
        projectsCompleted: 10,
    },
    {
        skill: "NextJS",
        experienceLevel: 4,
        interestLevel: 4,
        yearsExperience: 4,
        projectsCompleted: 10,
    },
    {
        skill: "HTML",
        experienceLevel: 5,
        interestLevel: 3,
        yearsExperience: 6,
        projectsCompleted: 10,
    },
    {
        skill: "CSS",
        experienceLevel: 5,
        interestLevel: 3,
        yearsExperience: 6,
        projectsCompleted: 10,
    },
    {
        skill: "PostgreSQL",
        experienceLevel: 3,
        interestLevel: 2,
        yearsExperience: 2,
        coursesTaken: 1,
        projectsCompleted: 3
    },
    {
        skill: "React Native",
        experienceLevel: 4,
        interestLevel: 3,
        yearsExperience: 4,
        projectsCompleted: 4
    },
    {
        skill: "Dart/Flutter",
        experienceLevel: 2,
        interestLevel: 2,
        yearsExperience: 2,
        projectsCompleted: 3
    },
    {
        skill: "Android Development",
        experienceLevel: 3,
        interestLevel: 2,
        yearsExperience: 2,
        coursesTaken: 2,
        projectsCompleted: 2
    },
    {
        skill: "AWS Lambda",
        experienceLevel: 3,
        interestLevel: 2,
        yearsExperience: 4,
        projectsCompleted: 5
    },
]

export default function SkillsSection() {
    const [isSkillsExpanded, setExpandSkills] = useState(false)

    return (
        <section id="skills" className="pt-32">
            <SectionContainer>
                <div className="dm-text flex flex-col gap-8">
                    <h2 className={`text-2xl font-header`}>Technical Skills</h2>
                    <div className="flex flex-col items-center gap-4">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8">
                            {
                                isSkillsExpanded
                                    ? (Skills.map((sk, i) => <SkillGauge key={`${sk.skill}-${i}`} {...sk} />))
                                    : (Skills.map((sk, i) => i < 4 ? <SkillGauge key={`${sk.skill}-${i}`} {...sk} /> : null))
                            }
                        </div>

                        <button
                            className="z-0"
                            onClick={() => { setExpandSkills(!isSkillsExpanded) }}
                        >
                            {isSkillsExpanded ? (
                                <a href='#skills'><span className="flex flex-row gap-2 items-center border border-black dark:border-white rounded-lg py-2 px-4">Show less<RiSubtractLine /></span></a>
                            ) : (
                                <span className="flex flex-row gap-2 items-center border border-black dark:border-white rounded-lg py-2 px-4">Show more <RiAddLine /></span>
                            )}
                        </button>
                    </div>
                </div>

            </SectionContainer>
        </section>
    );
}

type SkillGaugeProps = {
    skill: string
    experienceLevel: 1 | 2 | 3 | 4 | 5
    interestLevel: 1 | 2 | 3 | 4 | 5,

    yearsExperience: number
    coursesTaken?: number
    projectsCompleted?: number
}

const SkillGauge = ({
    skill,
    experienceLevel,
    interestLevel,
    yearsExperience,
    coursesTaken,
    projectsCompleted

}: SkillGaugeProps) => {
    return (
        <div className={`flex flex-col justify-between p-4 bg-sky-900 dark:bg-white rounded-md w-fit dm-text-inverse gap-4 drop-shadow-light dark:drop-shadow-dark`}>
            <div className="flex flex-col sm:flex-row justify-between">
                <h3 className="flex flex-1 font-heading text-xl">{skill}</h3>
                <span className="flex flex-1 flex-col">
                    <p>{yearsExperience && `${yearsExperience} years experience`}</p>
                    <p>{coursesTaken ? `${coursesTaken} courses taken` : ''}</p>
                    <p>{projectsCompleted ? `${projectsCompleted > 9 ? '10+' : projectsCompleted} projects completed` : ''}</p>
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4 justify-between items-center"><p>Experience:</p><SkillGaugeIndicators level={experienceLevel} /></div>
            </div>
        </div>
    )
}


type SkillGaugeIndicatorsProps = {
    level: 1 | 2 | 3 | 4 | 5
}

const SkillGaugeIndicators = ({ level }: SkillGaugeIndicatorsProps) => {
    const indicators = [
        <SkillGaugeIndicator key={`indicator-1`} lighted={false} />,
        <SkillGaugeIndicator key={`indicator-2`} lighted={false} />,
        <SkillGaugeIndicator key={`indicator-3`} lighted={false} />,
        <SkillGaugeIndicator key={`indicator-4`} lighted={false} />,
        <SkillGaugeIndicator key={`indicator-5`} lighted={false} />,
    ]

    for (let i = 0; i < level; i++) {
        indicators[i] = <SkillGaugeIndicator key={`indicator-lighted-${i + 1}`} lighted={true} />
    }

    return (
        <div className={`flex flex-row gap-[2px]`}>
            {indicators}
        </div>
    )
}

const SkillGaugeIndicator = ({ lighted }: { lighted: boolean }) => {
    return (
        <div className={`${lighted ? 'bg-yellow-400' : 'bg-yellow-700 opacity-80'} relative w-8 h-4 sm:w-16 sm:h-6 rounded-xl z-auto`}>
            <div className={`absolute w-2 h-1 ${lighted ? 'bg-white/30' : 'bg-white/60'} top-[3px] sm:top-[5px] left-[4px] sm:left-[8px] border-white rounded-[100%]`}></div>
        </div>
    )
}