import React from 'react'
import Image from 'next/image'

const Know = () => {
  return (
    <>
      <section className="text-gray-600 body-font ml-10 mr-10">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Know About Us</h1>
            <div className="h-1 w-20 bg-blue-500 rounded"></div>
            <br />
            <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded text-lg">Explore More</button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 relative" style={{ height: '400px' }}>
            <Image
              className="object-cover object-center rounded"
              src="/images/Know.png"
              alt="hero"
              fill
              sizes="30vw"
              style={
                {objectFit : 'cover',}
              }
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Know
