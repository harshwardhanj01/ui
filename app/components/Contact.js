// import React from 'react'

// const Contact = () => {
//   return (
//     <>
    
//     <section className="text-white body-font relative"style={{backgroundImage: "url('/images/img_vector.png')", backgroundSize: "200% 200%"}}>
//   <div className="container px-5 py-24 mx-auto">
//   <form action="https://formspree.io/f/mzbngnyq" method="POST">
//     <div className="flex flex-col text-center w-full mb-12">
//       <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Feel Free To Contact Us</h1>
//       <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Enter The Following Details To Reach Us.</p>
//     </div>
//     <div className="lg:w-1/2 md:w-2/3 mx-auto">
//       <div className="flex flex-wrap -m-2">

//         <div className="p-2 w-1/3">
//           <div className="relative">
//             <label for="name" className="leading-7 text-sm text-white">First Name</label>
//             <input  autoComplete="off" type="text" id="name" name="First Name" className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
//           </div>
//         </div>

//         <div className="p-2 w-1/3">
//           <div className="relative">
//             <label for="name" className="leading-7 text-sm text-white">Last Name</label>
//             <input  autoComplete="off" type="text" id="name" name="Last Name" className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
//           </div>
//         </div>

//         <div className="p-2 w-1/3">
//           <div className="relative">
//             <label for="email" className="leading-7 text-sm text-white">Email</label>
//             <input  autoComplete="off" type="email" id="email" name="Email" className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
//           </div>
//         </div>

//         <div className="p-2 w-full">
//           <div className="relative">
//             <label for="message" className="leading-7 text-sm text-white">Message</label>
//             <textarea  autoComplete="off" id="message" name="Message" className="w-full bg-gray-100 bg-opacity-0 rounded  border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
//           </div>
//         </div>
//         <div className="p-2 w-full">
//           <button className="flex mx-auto font-bold text-blue-400 bg-white border-white border-2 py-2 px-8 focus:outline-none hover:bg-white rounded text-lg" type="submit" value="send">Send Message</button>
//         </div>
        
//       </div>
//     </div>
//     </form>
//   </div>
// </section>
    
//     </>
//   )
// }

// export default Contact
"use client";

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('https://feo05o66oj.execute-api.us-east-1.amazonaws.com/prod/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      setSuccess('Message sent successfully!');
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <section className="text-white body-font relative" style={{ backgroundImage: "url('/images/img_vector.png')", backgroundSize: "200% 200%" }}>
        <div className="container px-5 py-24 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Feel Free To Contact Us</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Enter The Following Details To Reach Us.</p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label htmlFor="firstName" className="leading-7 text-sm text-white">First Name</label>
                    <input autoComplete="off" type="text" id="firstName" name="firstName" onChange={handleChange} className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label htmlFor="lastName" className="leading-7 text-sm text-white">Last Name</label>
                    <input autoComplete="off" type="text" id="lastName" name="lastName" onChange={handleChange} className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="p-2 w-1/3">
                  <div className="relative">
                    <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                    <input autoComplete="off" type="email" id="email" name="email" onChange={handleChange} className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlFor="message" className="leading-7 text-sm text-white">Message</label>
                    <textarea autoComplete="off" id="message" name="message" onChange={handleChange} className="w-full bg-gray-100 bg-opacity-0 rounded border-2 border-white focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button className="flex mx-auto font-bold text-blue-400 bg-white border-white border-2 py-2 px-8 focus:outline-none hover:bg-white rounded text-lg" type="submit">Send Message</button>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {success && <p className="text-green-500 text-center mt-4">{success}</p>}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;

