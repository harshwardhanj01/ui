"use client";

import React, { useState,useEffect } from 'react'
import Services from "./Services";
import FAQ from "./FAQ";
import Image from 'next/image'
import ReactSpeedometer from 'react-d3-speedometer';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";



const Dashboard = () => {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    const token = Cookies.get('session_token');
    console.log(token)
    
    if (token) {
      try {
        // Decode the token to get user data
        const decoded = jwtDecode(token);
        setSession( {user : decoded} );
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [session?.user?.username ]);

  return (
    <>
    {/* <HeadDash/> */}

    <h1>{session?.user?.username}</h1>

    <br></br>
    <br></br>

    <section className=" body-font">
    <div className="container px-14  mx-auto">
      
        <div>
        
        <span className="font-bold text-blue-400 text-3xl">{}</span>
        </div>
        <h1 className="font-bold text-3xl">Welcome To Your Dashboard</h1>
    </div>


  <div className="container px-14 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 ">
      <div className="p-4 md:w-1/3.5 sm:w-1/2 w-full flex ">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-blue-400 text-white flex-grow flex justify-between">
            <div className="flex flex-col mt-12">
              <h2 className="title-font font-medium text-2xl text-white">Total Trades</h2>
              <br></br>
              <h2 className="title-font font-medium text-4xl">105</h2>
              <br></br>
              <h2 className="title-font font-medium text-2xl text-white">Risk Award Ratio</h2>
              <br></br>
              <h2 className="title-font font-medium text-4xl">15%</h2>
            </div>
            <div className="flex items-end mb-12">
              <Image src="/images/Head_Dash_Hero.png" width={300} height={300} alt="Feature Image"/>
            </div>
        </div>      
      </div>



      <div className="p-4 md:w-1/4 sm:w-1/2 w-full text-center items-center">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <Image src="/images/Untitled Design.png" width={300} height={300} alt="Feature Image"/>
          <h2 className="title-font font-medium text-xl text-gray-900">Trade History Log</h2>
          
        </div>
      </div>




      <div className="p-4 md:w-1/4 sm:w-1/2 w-full text-center items-center">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
        <Image src="/images/Untitled Design (4).png" width={300} height={300} alt="Feature Image"/>
          <h2 className="title-font font-medium text-xl text-gray-900">User Sentiment Analytics</h2>
         
        </div>
      </div>

      
    </div>

    <br></br>
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full text-center items-center ml-auto px-3">
    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex justify-center items-center">
      
        <ReactSpeedometer
            
            needleColor="red"
            startColor="green"
            segments={3}
            endColor="red"
        />
    </div>
</div>
  </div>
</section>
  
  <section id="how-it-works">
    <Services/>
  </section>

  <div style={{ height: '100px' }} />
   <section id="faq">
   <FAQ/>
   </section>






    
    </>
  )
}

export default Dashboard
