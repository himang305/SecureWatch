import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    platform: false,
    services: false,
    learn: false,
  });

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <nav className="bg-gray-800 p-4 m-6 rounded-3xl"> 
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="bg-green-500 rounded-full h-4 w-6 md:h-10 md:w-10 "></div>
          <div className="text-white md:text-2xl font-bold">SecureWatch</div>
          <div className='px-2'>
          <Link to="/signup">
          <button className="text-white bg-white text-gray-800 py-2 px-2 text-sm font-semibold  rounded-full md:hidden">
            Sign Up to SecureWatch
          </button>
          </Link>
          </div>
        </div>
        <div className="hidden md:flex space-x-6">
          <div className="relative group">
            <div className='flex gap-1'>
            <button onClick={() => toggleDropdown('platform')} className="text-white text-xl pt-1 flex items-center focus:outline-none">
              SecureWatch Platform <svg className="ml-1 mt-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            </div>
            {isDropdownOpen.platform && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Feature 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Feature 2</a>
              </div>
            )}
          </div>
          <div className="relative group">
            <button onClick={() => toggleDropdown('services')} className="text-white pt-1 flex items-center text-xl focus:outline-none">
              Services
              <svg className="ml-1 mt-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen.services && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 2</a>
              </div>
            )}
          </div>
          <div className="relative group">
            <button onClick={() => toggleDropdown('learn')} className="text-white text-xl pt-1  flex items-center focus:outline-none">
              Learn <svg className="ml-1 mt-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen.learn && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Resource 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Resource 2</a>
              </div>
            )}
          </div>
          <Link to="/login">
          <div className="text-white text-xl pt-1">Login</div>
          </Link>
          <Link to="/signup">
          <button className="text-white bg-white text-gray-800 py-2 px-4 rounded-full">
            Sign Up to SecureWatch
          </button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <div className="relative">
            <button onClick={() => toggleDropdown('platform')} className="w-full text-left block text-white flex justify-between py-2">
              SecureWatch Platform   <svg className="ml-1 mt-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen.platform && (
              <div className="bg-white shadow-lg rounded-md w-full">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Feature 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Feature 2</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => toggleDropdown('services')} className="w-full flex justify-between text-left block text-white py-2">
              Services <svg className="ml-1 mt-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen.services && (
              <div className="bg-white shadow-lg rounded-md w-full">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Service 2</a>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => toggleDropdown('learn')} className="w-full flex justify-between text-left block text-white py-2">
              Learn <svg className="ml-1 mt-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen.learn && (
              <div className="bg-white shadow-lg rounded-md w-full">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Resource 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Resource 2</a>
              </div>
            )}
          </div>
          <Link to="/login">
          <div className="block text-white py-2">Login</div>
          </Link>
          {/* <button className="w-full text-left block text-white bg-white text-gray-800 py-2 px-4 rounded-full mt-2">
            Sign Up to SecureWatch
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
