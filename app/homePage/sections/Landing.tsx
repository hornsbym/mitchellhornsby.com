'use client'
import Image from "next/image";
import profile_pic from '@/public/profile_pic_cropped.jpg'
import { Typewriter } from 'react-simple-typewriter'

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
            'a former college athlete',
            'learning how to ski',
            'raising two golden retrievers',
            'interested in working with you :)'
        ]
    }

    return (
        <section
            className="flex flex-col gap-4 items-center w-full aspect-square sm:aspect-[7/5] lg:aspect-[7/4] xl:aspect-[16/7] justify-center"
        >
            <div
                className="w-fit rounded-full border-black border-8"
            >
                <Image
                    src={profile_pic}
                    alt="Portrait of Mitchell Hornsby standing in front of a snowy landscape at Yosemite National Park."
                    className="rounded-full aspect-square object-cover"
                />
            </div>
            <h1 className="text-3xl h-[5rem] font-body text-center w-3/4 sm:w-1/2 lg:w-1/4">{`Hi, I'm `}<span className="font-bold font-header"><Typewriter {...typewriterProps} /></span></h1>
        </section>
    );
}
