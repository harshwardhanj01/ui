"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { CgMenu, CgCloseO } from 'react-icons/cg';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const HeadDash = () => {
  const [session, setSession] = useState(null);

  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('session_token');
    console.log(token)
    
    if (token) {
      try {
        // Decode the token to get user data
        console.log("dash token : " + token);

        const decoded = jwtDecode(token);
        console.log("dash token decode : " + JSON.stringify(decoded,null,2));
        
        // Set the session state with the decoded user data
        setSession( {user : decoded} );
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [session?.user?.username ]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleSignOut = async () => {
    Cookies.remove('session_token');
  
    closeMobileMenu();
    router.replace("/"); // Redirect to home page after sign out
  };

  return (
    <>
      <header className="text-black body-font sticky top-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto flex flex-wrap p-1 sm:p-2 flex-col md:flex-row md:items-center justify-between" style={{ height: '8%' }}>
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/Marketminds_Logo(1).png"
                alt="Marketminds Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                width={32}
                height={32}
              />
            </Link>
          </div>
          <div className="absolute top-2 right-4 md:hidden">
            {isMobileMenuOpen ? (
              <CgCloseO className="text-black cursor-pointer" onClick={toggleMobileMenu} style={{ fontSize: '24px' }} />
            ) : (
              <CgMenu className="text-black cursor-pointer" onClick={toggleMobileMenu} style={{ fontSize: '24px' }} />
            )}
          </div>
          <nav className={`md:ml-auto flex flex-wrap ${isMobileMenuOpen ? `items-end` : `items-center`} text-base justify-center md:justify-end ${isMobileMenuOpen ? 'flex-col absolute top-full right-0 w-full bg-blue-100 p-5' : 'hidden md:flex'}`}>
            <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/dashboard" onClick={closeMobileMenu}>
              Dashboard
            </Link>
            <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/journals" onClick={closeMobileMenu}>
              Journals
            </Link>
            <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/trading" onClick={closeMobileMenu}>
              Trading
            </Link>
            <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/assessment" onClick={closeMobileMenu}>
              Assessment
            </Link>
            <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/learning" onClick={closeMobileMenu}>
              Learning
            </Link>

            <div className='relative'>
              <div className="profile" onClick={toggleDropdown}>
                <Image src="/images/img_ellipse11045.png" alt="Profile" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="flex flex-col">
                    {session?.user?.username && (
                      <li className="px-4 py-2 text-blue-400 font-bold">{session.user.username }</li>
                    )}
                    <Link href="/profile">
                      <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">Your Profile</li>
                    </Link>
                    <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={handleSignOut}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default HeadDash;
