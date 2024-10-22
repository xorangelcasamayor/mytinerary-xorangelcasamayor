import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CityDetail = ({ cities }) => {
  const { cityId } = useParams();
  const navigate = useNavigate(); 

  const city = cities.find(city => city._id === cityId);

  if (!city) {
    return <h1 className="text-white">City not found</h1>;
  }

  return (
    <div
    className="bg-cover bg-center h-screen"
    style={{ 
      backgroundImage: `url(${city.photo})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }} 
  >
    <div className="bg-black bg-opacity-30 h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-white">{city.city}, {city.country}</h1>
      <p className="text-lg text-white mt-4 px-4">{city.description}</p>
      <button
        onClick={() => navigate('/cities')} 
        className="mt-4 bg-blue-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
      >
        Back to Cities
      </button>
    </div>
  </div>
  
  );
};

export default CityDetail;
