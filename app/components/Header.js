"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { CgMenu, CgCloseO } from 'react-icons/cg';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";












const Header = () => {
  const [session, setSession] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    const token = Cookies.get('session_token');
    console.log(token)

    if (token) {
      try {
        // Decode the token to get user data
        setIsAuthenticated(true);
        const decoded = jwtDecode(token);
        setSession({ user: decoded });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    else{
       setIsAuthenticated(false);
    }
  }, [session?.user?.username,isAuthenticated]);




  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <header className="text-black body-font sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto flex flex-wrap p-1 sm:p-2 flex-col md:flex-row md:items-center justify-between " style={{ height: '8%' }} >
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
          <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="#how-it-works" onClick={closeMobileMenu}>
            How It Works
          </Link>
          <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="#faq" onClick={closeMobileMenu}>
            FAQs
          </Link>
          <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="#contact" onClick={closeMobileMenu}>
            Contact Us
          </Link>
          {isAuthenticated ? (
            <>
              <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/dashboard" onClick={closeMobileMenu}>
                Dashboard
              </Link>
              <div className={`relative ${isMobileMenuOpen ? `pr-5` : ``}`}>
                <div className="profile" onClick={toggleDropdown}>
                  <Image src="/images/img_ellipse11045.png" alt="Profile" width={32} height={32} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="flex flex-col">
                      {session?.user?.username && (
                        <li className="px-4 py-2 text-blue-400 font-bold">{session.user.username}</li>
                      )}
                      <Link href="/profile">
                        <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">Your Profile</li>
                      </Link>
                      <li className="px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => {   Cookies.remove('session_token'); closeMobileMenu();  router.replace("/"); }}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link className="mr-6 hover:text-blue-400 hover:underline hover:font-bold" href="/login" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link href="/register">
                <button className="bg-blue-400 hover:bg-white hover:border border-blue-400 hover:text-blue-400 text-white rounded-lg font-bold cursor-pointer px-6 py-2 mr-10" onClick={closeMobileMenu}>
                  Register
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
