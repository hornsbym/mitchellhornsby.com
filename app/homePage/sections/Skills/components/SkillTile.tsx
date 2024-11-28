'use client'
import { gql, useQuery } from "@apollo/client";
import { RiLoader3Fill } from "react-icons/ri";

type Props = {
    id: number
}

const GET_SKILL_DATA = (id: number) => gql`
{
    Skill(id: ${id.toString()}) {
        name
        yearsExperience
    } 
}
`

export default function SkillTile({ id }: Props) {
    const { loading, error, data } = useQuery(GET_SKILL_DATA(id));

    return (
        <>
            {
                loading
                    ? (<RiLoader3Fill className={`animate-spin text-[3rem]`} />)
                    : error
                        ? (<></>)
                        : (<div>
                            <h3>{data.Skill.name}</h3>
                            <p>{data.Skill.yearsExperience}</p>
                        </div>)
            }
        </>


    );
}