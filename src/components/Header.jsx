import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { SunIcon, MoonIcon, HomeIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/authActions'; 
import { setUser } from '../store/actions/authActions';
import axios from 'axios';

const loginWithToken = async (token) => {
  try {
    console.log("Se ejecuto Login With Token");

    const response = await axios.get(
      "http://localhost:8080/api/auth/validateToken",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "response");
    
    return response.data.user;
  } catch (error) {
    console.log("error", error);
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const authStore = useSelector(state => state.auth);
  console.log("authStore", authStore);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);

    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('bg-white');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('bg-gray-800');
    }

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('bg-white');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('bg-gray-800');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("token", token);
    console.log(params);
    
    if (token) {
      localStorage.setItem("token", token);

      loginWithToken(token).then((user) => {
        dispatch(setUser({ user, token }));
      });
      navigate("/"); // Navigate after token validation
    }
    
  }, [dispatch, navigate]);

  return (
    <header className={`absolute top-0 left-0 w-full flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-transparent'} text-white z-20`}>
      <div className="flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none md:hidden">
          <div className="space-y-1">
            <div className="h-1 w-8 bg-white"></div>
            <div className="h-1 w-8 bg-white"></div>
            <div className="h-1 w-8 bg-white"></div>
          </div>
        </button>

        {isMenuOpen && (
          <nav className="absolute top-0 left-0 w-64 h-screen bg-gray-800 text-white z-30">
            <ul className="flex flex-col items-start space-y-4 p-4">
              <li className="flex items-center">
                <HomeIcon className="h-12 w-12 mr-2" />
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li className="flex items-center">
                <GlobeAltIcon className="h-12 w-12 mr-2" />
                <Link to="/cities" className="hover:underline">Cities</Link>
              </li>
            </ul>
          </nav>
        )}
        
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="flex items-center hover:underline">
            <HomeIcon className="h-10 w-10" />
          </Link>
          
          {/* Always render the Cities link */}
          <Link to="/cities" className="flex items-center hover:underline">
            <GlobeAltIcon className="h-10 w-10" />
          </Link>
        </nav>
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

      {authStore.user ? (
        <div className="relative flex items-center space-x-4 text-xl ">
        
          {authStore.user.photoUrl ? (
            <img
              src={authStore.user.photoUrl} 
              alt={authStore.user.name || 'User'}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-white">
                {authStore.user.name ? authStore.user.name[0] : '?'}
              </span>
            </div>
          )}
       
          <span className="text-white">{authStore.user.name || 'User'}</span>
          <button onClick={handleLogout} className="flex items-center text-white ">
            <UserIcon className="h-10 w-10 mr-2" />
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <UserIcon className="h-10 text-white" />
        </Link>
      )}
    </header>
  );
};

export default Header;

