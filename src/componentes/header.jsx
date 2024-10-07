

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon, HomeIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('bg-gray-800', !isDarkMode);
    document.body.classList.toggle('bg-white', isDarkMode);
  };

  return (
    <header className={`absolute top-0 left-0 w-full flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-transparent'} text-white z-20`}>
      <div className="flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {}
          <div className="space-y-1">
            <div className="h-1 w-8 bg-white"></div>
            <div className="h-1 w-8 bg-white"></div>
            <div className="h-1 w-8 bg-white"></div>
          </div>
        </button>
        {isMenuOpen && (
          <nav className="absolute top-0 left-0 w-64 h-screen bg-gray-800 text-white z-30" onMouseLeave={handleMouseLeave}>
            <ul className="flex flex-col items-start space-y-4 p-4">
              <li className="flex items-center">
                <HomeIcon className="h-6 w-6 mr-2" />
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li className="flex items-center">
                <GlobeAltIcon className="h-6 w-6 mr-2" />
                <Link to="/cities" className="hover:underline">Cities</Link>
              </li>
              {}
            </ul>
          </nav>
        )}
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg">{time}</span>
        <button 
          onClick={toggleDarkMode} 
          className="bg-gray-700 text-white p-2 rounded-md mt-2 flex items-center"
        >
          {isDarkMode ? (
            <SunIcon className="h-5 w-5 mr-1" />
          ) : (
            <MoonIcon className="h-5 w-5 mr-1" />
          )}
          {isDarkMode ? 'Day Mode' : 'Night Mode'}
        </button>
      </div>
      <UserIcon className="h-10 text-white" />
    </header>
  );
};

export default Header;

