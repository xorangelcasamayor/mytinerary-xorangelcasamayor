import React, { useEffect, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCitiesRequest, fetchCitiesSuccess, fetchCitiesFailure } from '../store/actions/citiesAction'; 

const CitiesPage = ({ isDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cities, loading, error } = useSelector(state => state.cities);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCity, setHoveredCity] = useState(null);

  useEffect(() => {

    const fetchCities = async () => {
      dispatch(fetchCitiesRequest());
      try {
        const response = await axios.get('http://localhost:8080/api/cities/all');
        dispatch(fetchCitiesSuccess(response.data.response)); 
      } catch (err) {
        dispatch(fetchCitiesFailure(err.message)); 
      }
    };

    fetchCities();
  }, [dispatch]);

 
  const filteredCities = cities.filter(city =>
    city.city && city.city.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-slate-600'}`}>
        <h1 className="text-center text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-slate-600'}`}>
        <h1 className="text-center text-3xl font-bold text-white">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-slate-600'} py-8`}>
      <h1 className="mt-24 text-center text-3xl font-bold mb-4 text-white">Cities</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 rounded border border-gray-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div 
              key={city._id} 
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div 
                className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/city/${city._id}`)} 
                onMouseEnter={() => setHoveredCity(city._id)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <img 
                  src={city.photo} 
                  alt={city.city} 
                  className="w-full h-60 object-cover" 
                />
                {hoveredCity === city._id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
                    See more
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between bg-gradient-to-t from-black to-transparent text-white">
                  <h3 className="text-lg font-semibold">{city.city}</h3>
                  <div className="flex items-center">
                    <HeartIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    <span className="ml-1 text-sm">{city.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl text-white">No cities found.</div>
        )}
      </div>
    </div>
  );
};

export default CitiesPage;
