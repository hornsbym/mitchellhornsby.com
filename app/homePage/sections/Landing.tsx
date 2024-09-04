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
            'looking for work!',
            'a former college athlete',
            'probably either hiking or skiing'
        ]
    }

    return (
        <section
            className="relative flex flex-col justify-center pt-16 gap-8 items-center w-full aspect-[7/6] md:aspect-[7/4] lg:aspect-[7/3] xl:aspect-[16/5]"
            id="home"
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
            <h1 className="dm-text text-3xl h-[5rem] font-body text-center w-3/4 sm:w-1/2 lg:w-1/4">{`Hi, I'm `}<span className="font-bold font-header"><Typewriter {...typewriterProps} /></span></h1>
        </section>
    );
}
