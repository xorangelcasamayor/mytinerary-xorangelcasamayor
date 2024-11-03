

import React, { useState, useEffect } from 'react';
import cities from './data/cities'; 
import { HeartIcon } from '@heroicons/react/24/solid';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(cities.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalCities = cities.length;
  const visibleCities = 4;

  return (
    <div className="carousel-container">
      <h2 className="text-center text-2xl font-bold mt-4">Popular Tineraries</h2>
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex transition-transform duration-500" 
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCities)}%)` }}
        >
          {cities.map((city, index) => (
            <div key={index} className="w-1/4 flex-shrink-0 p-2">
              <div className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                <img src={city.photo} alt={city.city} className="w-full h-60 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between bg-gradient-to-t from-black to-transparent text-white">
                  <h3 className="text-lg font-semibold">{city.city}</h3>
                  <div className="flex items-center">
                    <HeartIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    <span className="ml-1 text-sm">{city.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalCities % visibleCities !== 0 && (
          <div className="flex justify-center w-full">
            {Array.from({ length: visibleCities - (totalCities % visibleCities) }).map((_, i) => (
              <div key={i} className="w-1/4 flex-shrink-0 p-2 opacity-0">
                {}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
