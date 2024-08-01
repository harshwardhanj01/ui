"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from "next/image";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setColor("red");
      setMessage('Invalid or expired token.');
    }
  }, [token]);

  useEffect(() => {
    if (message !== "") {
      setLoading(false);
      const timer = setTimeout(() => {
        setMessage("");
      }, 6000);

      return () => clearTimeout(timer); // Cleanup function to clear the timer if message changes before the timeout
    }
  }, [message]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start submission

    if (password !== confirmPassword) {
      setColor("red");
      setMessage('Passwords do not match');
      return;
    }

    if (!token) {
      setColor("red");
      setMessage("Invalid or expired token");
      return;
    }


    try {
      const form = e.target;
      // Disable all form fields
      const formElements = form.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }
      const response = await fetch('/api/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });
      const data = await response.json();

      if (data.success) {
        setColor("green");
        setMessage("Passored Changed Successfully");
        window.history.replaceState({}, document.title, window.location.pathname); // removes token from search bar after successfull try..
        router.push('/login');
      }
    } catch (error) {
      setColor("red");
      setMessage('Error resetting password. Please try again.');
    } finally {
      setLoading(false); // End submission
    }
  };


  return (
     <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
     <div className="container h-full p-4">
       <div className="flex h-full flex-wrap items-stretch justify-center text-neutral-800 dark:text-neutral-200">
         <div className="w-full lg:w-6/12 flex justify-center">
           <div className="block rounded-none lg:rounded-l-lg bg-white shadow-lg dark:bg-neutral-800 w-full h-full">
             <div className="px-4 md:px-6 lg:px-8 md:mx-6 md:p-12">
               <div className="text-center">
                 <Image className="mx-auto w-48" src="/images/Marketminds_Logo(1).png" alt="logo" width={400} height={400} />
                 <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                   We are The Marketminds Team
                 </h4>
               </div>
 
               <form onSubmit={handleSubmit} className="flex flex-col gaps-3">
                 <h1 className="text-xl font-bold my-4">Email Address Verified Successfully</h1>
                 <p className="mb-4">Set new password</p>
 
                 <div className="relative mb-4" data-twe-input-wrapper-init>
                   <input
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     value={password}
                     className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                     id="exampleFormControlInput1"
                     placeholder="Password"
                     required
                     disabled={loading}
                   />
                   <label
                     htmlFor="exampleFormControlInput1"
                     className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                   >
                     Password
                   </label>
                 </div>
 
                 <div className="relative mb-4" data-twe-input-wrapper-init>
                   <input
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     type="password"
                     value={confirmPassword}
                     className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                     id="exampleFormControlInput2"
                     placeholder="Confirm Password"
                     required
                     disabled={loading}
                   />
                   <label
                     htmlFor="exampleFormControlInput2"
                     className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                   >
                     Confirm Password
                   </label>
                 </div>
 
                 <button type="submit" className="bg-blue-500 text-white font-bold cursor-pointer px-6 py-2" disabled={loading}>
                   {loading ? (
                     <div
                       className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                       role="status">
                       <span
                         className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                       >Loading...</span>
                     </div>
                   ) : 'Verify'}
                 </button>
 
                 {message && (
                   <div className={`bg-${color}-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2`}>
                     {message}
                   </div>
                 )}
               </form>
             </div>
           </div>
         </div>
 
         <div className="w-full lg:w-6/12 flex justify-center">
           <div className="flex items-center rounded-none lg:rounded-r-lg w-full h-full"
             style={{ background: "linear-gradient(to right, #2ea1d8, #65bae1, #a4d6ec, #dfeef5)" }}>
             <div className="px-4 py-6 text-white md:mx-6 md:p-12 w-full h-full flex flex-col justify-center">
               <div className="relative w-full h-full flex items-center justify-center">
                 <Image src="/images/resetpassbaground1.png" alt="Base" className="w-full h-full object-cover" width={400} height={400} />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Image src="/images/img_frame1171277917.png" alt="Overlay" className="w-1/2 h-1/2 opacity-50 object-cover" width={400} height={400}/>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
  );
};

export default ResetPassword;
