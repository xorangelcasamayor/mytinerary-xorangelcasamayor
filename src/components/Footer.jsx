
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 border-t border-white">
      <div className="container mx-auto flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
        <p className="mb-4">123 Main St, Anytown, USA</p>
        <p className="mb-4">Email: info@mytinerary.com</p>
        <p className="mb-4">Phone: (123) 456-7890</p>

        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
        <div className="flex space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="h-6 w-6 text-white hover:text-blue-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-6 w-6 text-white hover:text-pink-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="h-6 w-6 text-white hover:text-blue-400" />
          </a>
        </div>

        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} My Tinerary. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
