'use client'
import { useState } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

const Skills: SkillGaugeProps[] = [
    {
        skill: "Javascript/Typescript",
        experienceLevel: 4,
        interestLevel: 4
    },
    {
        skill: "React",
        experienceLevel: 4,
        interestLevel: 5
    },
    {
        skill: "NextJS",
        experienceLevel: 4,
        interestLevel: 4
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
                        <div className="flex flex-row gap-4 flex-wrap">
                            {Skills.map(sk => <SkillGauge {...sk} />)}
                        </div>
                    ) : (
                        <div className="flex flex-row gap-4 flex-wrap">
                            {Skills.map(sk => <SkillGauge {...sk} />)}
                        </div>
                    )
                }
                <button
                    onClick={() => { setExpandSkills(!isSkillsExpanded) }}
                >
                    {isSkillsExpanded ? (
                        <span className="flex flex-row gap-2 items-center">Show less <RiSubtractLine /></span>
                    ) : (
                        <span className="flex flex-row gap-2 items-center">Show more <RiAddLine /></span>
                    )}
                </button>
            </div>

        </section>
    );
}

type SkillGaugeProps = {
    skill: string
    experienceLevel: 1 | 2 | 3 | 4 | 5
    interestLevel: 1 | 2 | 3 | 4 | 5
}

const SkillGauge = ({
    skill,
    experienceLevel,
    interestLevel
}: SkillGaugeProps) => {
    return (
        <div className={`flex flex-col p-4 bg-black rounded-md w-fit text-white gap-4`}>
            <h3 className="font-heading text-xl">{skill}</h3>
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
        <SkillGaugeIndicator lighted={false} />,
        <SkillGaugeIndicator lighted={false} />,
        <SkillGaugeIndicator lighted={false} />,
        <SkillGaugeIndicator lighted={false} />,
        <SkillGaugeIndicator lighted={false} />,
    ]

    for (let i = 0; i < level; i++) {
        indicators[i] = <SkillGaugeIndicator lighted={true} />
    }

    return (
        <div className={`flex flex-row gap-[2px]`}>
            {indicators}
        </div>
    )
}

const SkillGaugeIndicator = ({ lighted }: { lighted: boolean }) => {
    return (
        <div className={`${lighted ? 'bg-green-600' : 'bg-green-800 opacity-80'} w-16 h-4 rounded-lg`} />
    )
}