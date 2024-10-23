import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './componentes/header';
import Hero from './componentes/hero';
import Carousel from './componentes/carousel';
import Footer from './componentes/Footer';
import CitiesPage from './componentes/citiesPage';
import CityDetail from './componentes/cityDetails';

const App = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('http://localhost:8080/api/cities/all');
      const data = await response.json();
      setCities(data.response);
    };

    fetchCities();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<><Hero /><Carousel /></>} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/city/:cityId" element={<CityDetail cities={cities} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

