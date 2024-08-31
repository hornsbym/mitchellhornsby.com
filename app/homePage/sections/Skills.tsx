'use client'
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
        <section
            className=""
        >
            <h2 className={`text-2xl font-header`}>Technical Skills</h2>
            <p></p>
            <div className="flex flex-col items-center gap-4">
                {
                    isSkillsExpanded ? (
                        <div className="flex flex-row justify-center gap-4 flex-wrap">
                            {Skills.map((sk, i) => <SkillGauge key={`${sk.skill}-${i}`} {...sk} />)}
                        </div>
                    ) : (
                        <div className="flex flex-row justify-center gap-4 flex-wrap">
                            {Skills.map((sk, i) => i < 3 ? <SkillGauge key={`${sk.skill}-${i}`} {...sk} /> : null)}
                        </div>
                    )
                }
                <button
                    onClick={() => { setExpandSkills(!isSkillsExpanded) }}
                >
                    {isSkillsExpanded ? (
                        <span className="flex flex-row gap-2 items-center border border-black rounded-lg p-2">Show less<RiSubtractLine /></span>
                    ) : (
                        <span className="flex flex-row gap-2 items-center border border-black rounded-lg p-2">Show more <RiAddLine /></span>
                    )}
                </button>
            </div>

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
        <div className={`flex flex-col justify-between p-4 bg-black rounded-md w-fit text-white gap-4`}>
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
                <div className="flex flex-row gap-4 justify-between items-center"><p>Interest:</p><SkillGaugeIndicators level={interestLevel} /></div>
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
        <div className={`${lighted ? 'bg-green-600' : 'bg-green-800 opacity-80'} w-8 h-2 sm:w-16 sm:h-4 rounded-lg`} />
    )
}