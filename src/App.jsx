
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import CityPage from './components/CityPage';
import CityDetail from './components/CityDetail';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<><Hero /><Carousel /></>} />
          <Route path="/cities" element={<CityPage />} />
          <Route path="/city/:cityId" element={<CityDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
