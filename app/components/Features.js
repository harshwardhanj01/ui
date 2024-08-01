import React from 'react'
import Image from 'next/image';


const Features = () => {
  return (
    <>
      <section className="text-gray-600 body-font" style={{ backgroundImage: "url('/images/img_vector.png')", backgroundSize: "290% 150%" }}>
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap -m-1 justify-center">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-5xl text-2xl font-medium title-font mb-4 text-white">Top Features</h1>
              <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-white inline-flex"></div>
              </div>

            </div>

            <br />
            <div className='flex gap-10 flex-wrap items-center justify-center'>
              <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" style={{ height: 500 }}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
                  <Image className="h-60 w-full object-cover object-center" src="/images/Feature(1).png" alt="blog" height={240} width={277.795} />
                  <div className="p-6 text-center bg-white">
                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3">Risk Assessment</h1>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" style={{ height: 500 }}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
                  <Image className="h-60 w-full object-cover object-center" src="/images/Feature(2).png" alt="blog" height={240} width={277.795} />
                  <div className="p-6 text-center bg-white">
                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3">Performance Benchmark</h1>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" style={{ height: 500 }}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
                  <Image className="h-60 w-full object-cover object-center" src="/images/Feature(3).png" alt="blog" height={240} width={277.795} />
                  <div className="p-6 text-center bg-white">
                    <h1 className="title-font text-lg font-bold text-gray-900 mb-3">Trade Strategy</h1>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <br /><br />
          <button className="flex mx-auto font-bold text-white  border-white border-2 py-2 px-8 focus:outline-none hover:bg-blue-400 rounded text-lg">Explore More</button>
        </div>
      </section>




    </>
  )
}

export default Features