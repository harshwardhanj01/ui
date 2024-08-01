"use client";

import Link from "next/link";
import Cookies from 'js-cookie';

import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useSession } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[color,setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        // credentials: 'include', // Important for sending cookies
      });
      
      const data = await response.json();
      console.log(data.body['Set-Cookie']);


      



      // const sessionToken = response.headers.get('Set-Cookie').split('=')[1].split(';')[0];
      console.log("in......");
      // console.log(sessionToken)
      

      // need to chk if status code is wronge........................

      if (data.body.userVerification) {
        Cookies.set('session_token', data.body['Set-Cookie'] , { expires: 7, secure: true });
        
        router.push('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred during login');
    }
    finally{
      setLoading(false);
    }
  
  };

  return (
    <section className="gradient-form h-full dark:bg-white">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">

          <div className="w-full lg:w-6/12">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="px-4 md:px-0 md:mx-6 md:p-12">

                <div className="text-center">
                  <Image className="mx-auto w-48" src="/images/Marketminds_Logo(1).png" alt="logo" width={400} height={400} />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-black">
                    MarketMinds
                  </h4>
                </div>


                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <h1 className="text-xl font-bold my-4 text-black">Login</h1>
                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="block w-full min-h-[auto] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear text-black"
                      // className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                    <label
                      for="exampleFormControlInput1"
                      className={`absolute left-3 top-0.5 mb-0 max-w-[90%] truncate pt-1 leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${email ? '-translate-y-[1.5rem] text-sm text-primary' : ''}`}
                      // className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary text-black"
                    >
                      Email
                    </label>
                  </div>


                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="block w-full min-h-[auto] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder-opacity-0 text-black"
                      // className="text-red peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput11"
                      placeholder=""
                    />
                    <label
                      for="exampleFormControlInput11"
                      className={`absolute left-3 top-0.5 mb-0 max-w-[90%] truncate pt-1 leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${password ? '-translate-y-[1.5rem] text-sm text-primary' : ''}`}
                      // className="absolute left-3 top-0 mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out"
                      // className="text-black pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      Password
                    </label>
                  </div>

                  <div className="text-right mt-2 text-black">
                    <a href="/forgot_password" className="text-sm">Forgot password?</a>
                  </div>
                  <button  className="bg-blue-400 rounded-lg text-white font-bold cursor-pointer px-6 py-2 hover:bg-blue-500 transition-colors" disabled={loading}>
                    {loading ? (<div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span>
                    </div>) : "Login"}
                  </button>
                  {message && (
                    <div className={`bg-${color}-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2`}>
                      {message}
                    </div>
                  )}
                  {/* {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )} */}
                </form>


                {/*  */}





                <div className="flex items-center justify-center mt-4">
                  <p className="text-sm text-black">Don&apos;t have an account? </p>
                  <Link href={"/register"} type="button" className="ml-5 px-4 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                    Register
                  </Link>
                </div>
                <br></br>
                <div className="flex justify-center text-black">
                  <p>OR</p>
                </div>
                <br></br>
                <div className="flex justify-center">
                  {/* <button onClick={() => signIn("google")} className="px-4 py-2 border flex gap-2 border-slate-500 rounded-lg text-black hover:bg-blue-200  hover:shadow transition duration-150">
                    <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" height={6} width={6} />
                    <span>Login with Google</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>






          <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
            style={{ background: "linear-gradient(to right, #2ea1d8, #65bae1, #a4d6ec, #dfeef5)" }}>
            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
              <Image src="/images/Hero (1).png" alt="Hero" width={600} height={600} />
              <h4 className="mb-6 text-xl font-semibold">
                We are more than just a company
              </h4>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

  );
}

export default LoginPage
