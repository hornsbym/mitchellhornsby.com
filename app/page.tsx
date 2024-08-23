'use client'
import Lottie from 'react-lottie'
import under_construction from '../public/under_construction.json'


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: under_construction,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


export default function Home() {
  return (
    <main className={`
    flex
    flex-col
    w-full
    min-h-screen
    items-center
    justify-start
    pt-16
    sm:justify-center
    sm:pt-0
    `}>
      <div className="flex flex-col gap-4 text-white justify-start items-center text-center px-4">
        <h1 className="font-header text-4xl">{`Website under constuction`}</h1>
        <div className="hidden sm:flex">
          <Lottie
            options={defaultOptions}
            height={600}
            width={600}
          />
        </div>
        <div className="flex sm:hidden">
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
          />
        </div>

        <p className="text-2xl">{`Check back soon for updates!`}</p>
      </div>

    </main>
  );
}
