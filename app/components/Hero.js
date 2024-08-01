"use client";
import React from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { useSession } from "next-auth/react";

const Hero = () => {
  // const { data: session } = useSession();

  return (
    <>
      <section className="text-gray-600 body-font ml-10 mr-10">
        {/* {session ? (
          <div className="flex justify-center items-center">
            <Link href="/dashboard">
              <button className="bg-blue-400 hover:bg-white hover:border border-blue-400 hover:text-blue-400 text-white rounded-lg font-bold cursor-pointer px-6 py-2 mr-10">Go To Dashboard</button>
            </Link>
          </div>
        ) : (
          <> </>
        )} */}

        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Provide you with an Awesome AI-driven <span className="text-blue-400">Trading.</span></h1>
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-400 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded text-lg">Get Started</button>
              <Link href={"/about"}>
                <button className="ml-4 inline-flex text-black bg-gray-100 border-2 border-black py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">How It Works</button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 drop-shadow-xl relative">
            {/* <Carousel autoPlay infiniteLoop showArrows={false} showIndicators={false} showThumbs={false} interval={4000}> */}
                            
              {/* <div>
                <Image src="/images/Hero (1).png" alt="Hero 1" style={{ height: '400px', objectFit: 'cover' }} height={400} width={100} />
              </div>
              <div>
                <Image src="/images/Hero (2).png" alt="Hero 2" style={{ height: '400px', objectFit: 'cover' }} height={400} width={100}/>
              </div> */}

              
            {/* </Carousel> */}


            <Image src="/images/heromain.jpeg" alt="Hero 1" style={{ height: '400px', objectFit: 'cover' }} height={400} width={400} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;