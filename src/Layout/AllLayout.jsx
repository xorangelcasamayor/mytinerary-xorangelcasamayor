import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AllLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
    
    </div>
  );
};

export default AllLayout;

