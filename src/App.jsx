import { Routes, Route } from 'react-router-dom';
import Header from './componentes/header';
import Hero from './componentes/hero';

import Carousel from './componentes/carousel';
import Footer from './componentes/Footer';
import CitiesPage from './componentes/citiesPage';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<><Hero /><Carousel /></>} />
          <Route path="/cities" element={<CitiesPage />} />
       
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
