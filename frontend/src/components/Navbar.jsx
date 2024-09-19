import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSearchModal } from '../redux/modal-slice';
import SearchModal from './SearchModal'; // Import your SearchModal component

const Navbar = ({ isAuthenticated }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // Close mobile menu on link click
  };

  return (
    <nav>
      {showAnnouncement && (
        <div className="bg-[#74B72E] text-[#FFFFFF] font-extrabold px-3 flex justify-between items-center">
          <div className="w-full text-center">Top Recipe</div>
          <button
            className="text-[#FFFFFF] bg-[transparent] text-2xl font-bold shadow-none"
            onClick={() => setShowAnnouncement(false)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex justify-between items-center px-5 py-3 bg-[#F2F9E5] shadow-md">
        {/* Logo Section */}]
        <div className="flex items-center">
          <img src="logo.png" className="h-17 w-20" alt="logo" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden px-2 py-1" onClick={handleMobileMenuToggle}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>

        {/* Navigation Links */}
        <ul className={`hidden md:flex md:flex-row md:space-x-8 ${isMobileMenuOpen ? 'flex flex-col' : 'hidden'}`}>
          <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
          </li>

          <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/recipes' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
            <Link to="/recipes" onClick={handleLinkClick}>Recipes</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/profile' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
              </li>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/add-recipe' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/add-recipe" onClick={handleLinkClick}>Add Recipe</Link>
              </li>
            </>
          ) : (
            <>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/login' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/login" onClick={handleLinkClick}>Login</Link>
              </li>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/signup' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/signup" onClick={handleLinkClick}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Navigation Links */}
      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col space-y-2 px-5 py-3 bg-[#F2F9E5] shadow-md h-[100vh]">
          <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
          </li>

          <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/recipes' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
            <Link to="/recipes" onClick={handleLinkClick}>Recipes</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/profile' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
              </li>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/add-recipe' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/add-recipe" onClick={handleLinkClick}>Add Recipe</Link>
              </li>
            </>
          ) : (
            <>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/login' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/login" onClick={handleLinkClick}>Login</Link>
              </li>
              <li className={`hover:text-[#74B72E] transition-colors duration-300 ease-in-out ${location.pathname === '/signup' ? 'text-[#4F8A10] font-bold border-b-2 border-[#74B72E]' : ''}`}>
                <Link to="/signup" onClick={handleLinkClick}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      )}

      {/* Search Icon Button */}
      <button
        className="fixed bottom-4 right-4 bg-green-600 text-white p-5 rounded-full text-xl"
        onClick={() => setSearchModalOpen(true)}
      >
        🔍
      </button>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
