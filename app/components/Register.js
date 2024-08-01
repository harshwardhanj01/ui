"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { signIn } from "next-auth/react";
// import { v4 as uuidv4 } from "uuid";

// import { sendVerificationEmail } from "../api/sendAuthinticationMail/route";



const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  // const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const router = useRouter();

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
    setLoading(true);

    console.log(`${name} ${email} ${password}`);
    if (!name || !email || !password) {
      setColor("red");
      setMessage("All fields are necessary.");
      
      return;
    }

    try {
      
      const res = await fetch('https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email,password }),
      });
      
      console.log(res)
      if (res.ok) {
        setColor("green");
        setMessage("Check the mail to verify");
        
        // console.log("Check the mail to verify");
        const form = e.target;
        form.reset(); // Reset the form

        // Disable all form fields
        // const formElements = form.elements;
        // for (let i = 0; i < formElements.length; i++) {
        //   formElements[i].disabled = true;
        // }

        // router.push("/dashboard");
        // setRegistrationSuccess(true);

      } else {
        // console.log("User registration failed.");
        setColor("red");
        setMessage("User registration failed.");
        

      }
    } catch (error) {
      // console.log("Error during registration: ", error);
      setColor("red");
      setMessage("Error during registration");
      
    }
  };

  return (
    <section className="gradient-form h-full bg-white">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-black">

          <div className="w-full lg:w-6/12">
            <div className="block rounded-lg bg-white shadow-lg ">
              <div className="px-4 md:px-0 md:mx-6 md:p-12">

                <div className="text-center">
                  <Image className="mx-auto w-48" src="/images/Marketminds_Logo(1).png" alt="logo" width={400} height={400} />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    MarketMinds
                  </h4>
                </div>


                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <h1 className="text-xl font-bold my-4">Register</h1>
                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="block w-full min-h-[auto] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear text-black"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                    <label
                      for="exampleFormControlInput1"
                      className={`absolute left-3 top-0.5 mb-0 max-w-[90%] truncate pt-1 leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${name ? '-translate-y-[1.5rem] text-sm text-primary' : ''}`}
                    >
                      Name
                    </label>
                  </div>




                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="block w-full min-h-[auto] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear text-black"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                    <label
                      for="exampleFormControlInput1"
                      className={`absolute left-3 top-0.5 mb-0 max-w-[90%] truncate pt-1 leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${email ? '-translate-y-[1.5rem] text-sm text-primary' : ''}`}
                    >
                      Email
                    </label>
                  </div>


                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="block w-full min-h-[auto] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder-opacity-0 text-black"
                      id="exampleFormControlInput11"
                      placeholder=""
                    />
                    <label
                      for="exampleFormControlInput11"
                      className={`absolute left-3 top-0.5 mb-0 max-w-[90%] truncate pt-1 leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${password ? '-translate-y-[1.5rem] text-sm text-primary' : ''}`}
                    >
                      Password
                    </label>
                  </div>


                  <button className="bg-blue-400 rounded-lg text-white font-bold cursor-pointer px-6 py-2 hover:bg-blue-500 transition-colors" disabled={loading}>
                    {loading ? (
                      <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                      </div>
                    ) : "Register" }
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
                  {/* Pop-up message for registration success */}
                  {/* {registrationSuccess && (
                    <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                      Registration successful!
                    </div>
                  )} */}
                </form>





                <div className="flex items-center justify-center mt-4">
                  <p className="text-sm">Already have an account? </p>
                  <Link href={"/login"} type="button" className="ml-5 px-4 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                    Login
                  </Link>
                </div>
                <br></br>
                <div className="flex justify-center text-black">
                  <p>OR</p>
                </div>
                <br></br>
                <div className="flex justify-center">
                  <button onClick={() => signIn("google")} className="px-4 py-2 border flex gap-2 border-slate-500 rounded-lg text-black hover:bg-blue-200  hover:shadow transition duration-150">
                    <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" height={6} width={6} />
                    <span>Login with Google</span>
                  </button>
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

export default Register
