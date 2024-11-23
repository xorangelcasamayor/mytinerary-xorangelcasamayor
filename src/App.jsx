import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import CityPage from './Pages/CityPage';
import CityDetail from './Pages/CityDetail';
import Footer from './components/Footer';
import AllLayout from './Layout/AllLayout';
import LoginPage from './Pages/signIn';
import SignUp from './Pages/singUp';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<AllLayout><Hero /><Carousel /></AllLayout>} />
       
          <Route path="/cities" element={<AllLayout><CityPage /></AllLayout>} />
        
        <Route path="/city/:cityId" element={<AllLayout><CityDetail /></AllLayout>} />
        <Route path="/login" element={<AllLayout><LoginPage /></AllLayout>} />
        <Route path="/signup" element={<AllLayout><SignUp /></AllLayout>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;



