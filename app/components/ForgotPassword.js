"use client";

import Image from "next/image";

import { useState,useEffect } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('red');
  const [loading, setLoading] = useState(false);

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
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!resUserExists.ok) {
        setColor('red');
        setMessage("Please try again..");
        throw new Error('User existence check failed');
      }

      const { user } = await resUserExists.json();

      if (!user) {
        setColor('red');
        setMessage("Invalid Credentials");
      } else {
        const res = await fetch("/api/forgotpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          setColor("red");
          setMessage("Password reset request failed");
          throw new Error('Password reset request failed');
        }

        setColor("green");
        setMessage("Check mail to reset password");
      }
    } catch (error) {
      setColor('red');
      setMessage('Error sending email. Please try again.');
    } finally {
      setLoading(false); // End submission
    }
  };

  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full lg:w-6/12">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="px-4 md:px-0 md:mx-6 md:p-12">
                <div className="text-center">
                  <Image className="mx-auto w-48" src="/images/Marketminds_Logo(1).png" alt="logo" width={400} height={400} />
                  <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                    We are The Marketminds Team
                  </h4>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <h1 className="text-xl font-bold my-4">Forgot Password</h1>
                  <p className="mb-4">Enter the email address on which your account is registered.</p>

                  <div className="relative mb-4" data-twe-input-wrapper-init>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder="Email Address"
                      required
                      disabled={loading}
                    />
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                    >
                      Email
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
                    ) : 'Forgot Password'}
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

          <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
            style={{ background: "linear-gradient(to right, #2ea1d8, #65bae1, #a4d6ec, #dfeef5)" }}>
            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
              <Image src="/images/img_forgotpasswordbro.png" alt="image" width={600} height={600} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
