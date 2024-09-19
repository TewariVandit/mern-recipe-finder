import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
        <div className="flex space-x-6 mb-6">
          <a href="/" className="hover:text-green-400" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="/" className="hover:text-green-400" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="/" className="hover:text-green-400" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="/" className="hover:text-green-400" aria-label="Pinterest">
            <FaPinterest size={24} />
          </a>
        </div>
        <div className="flex space-x-6 mb-4">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/recipes" className="hover:text-green-400">Recipes</Link>
          <Link to="/login" className="hover:text-green-400">Login</Link>
          <Link to="/signup" className="hover:text-green-400">Signup</Link>
        </div>
        <div className="text-sm text-center">
          &copy; {new Date().getFullYear()} Vandit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
