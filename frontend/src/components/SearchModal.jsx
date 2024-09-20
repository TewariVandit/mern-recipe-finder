import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Track current category index
  
  const navigate = useNavigate();

  // Handle search term input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch ingredients from the API
  const fetchIngredients = async () => {
    try {
      const response = await axios.get('https://mern-recipe-finder.onrender.com/api/v1/recipe/ingredients');
      // Filter out empty values from the response
      const filteredData = {};
      for (const key in response.data) {
        if (response.data[key].length > 0) {
          filteredData[key] = response.data[key];
        }
      }
      setIngredients(filteredData);
    } catch (err) {
      setError('Failed to fetch ingredients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchIngredients(); // Fetch ingredients when modal opens
    }
  }, [isOpen]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) => 
      prev.includes(ingredient) 
        ? prev.filter((item) => item !== ingredient) 
        : [...prev, ingredient]
    );
  };

  const navigateToRecipes = () => {
    navigate('/recipes', { state: { selectedIngredients } });
    setSelectedIngredients([]); // Reset selected ingredients
    setCurrentCategoryIndex(0); // Reset to first category
    onClose(); // Close the modal after navigating
  };

  const showNextCategory = () => {
    setCurrentCategoryIndex((prev) => prev + 1);
  };

  const categories = ingredients ? Object.keys(ingredients) : [];

  if (!isOpen) return null; // Only render if the modal is open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full flex flex-col overflow-y-auto">

        {/* Header with Centered Logo and Close Button */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-black text-2xl px-4 py-2 font-extralight">
            &times;
          </button>
          <img src="logo.png" alt="Logo" className="h-16 mx-auto" />
        </div>

        {/* Search Bar and Button */}
        <div className="flex mb-4 text-center">
          <h1 className='text-center mt-5 text-2xl font-bold'>Search recipe by ingredients..</h1>
        </div>

        {/* Ingredients Section */}
        {loading && <p>Loading ingredients...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ingredients && (
          <div className="mt-4">
            {/* Show only the current category */}
            {currentCategoryIndex < categories.length ? (
              <>
                <h3 className="text-lg font-bold mt-4">{categories[currentCategoryIndex].charAt(0).toUpperCase() + categories[currentCategoryIndex].slice(1)}</h3>
                <ul className="space-y-2">
                  {ingredients[categories[currentCategoryIndex]].map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => toggleIngredient(item)}
                        className={`p-2 w-full text-left ${selectedIngredients.includes(item) ? 'bg-green-500 text-white' : 'bg-transparent'} text-black rounded`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Next/Go Button */}
                {currentCategoryIndex < categories.length - 1 ? (
                  <button 
                    onClick={showNextCategory} 
                    className="bg-blue-600 text-white p-2 rounded mt-4"
                    disabled={selectedIngredients.length === 0}
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={navigateToRecipes} 
                    className="bg-blue-600 text-white p-2 rounded mt-4"
                    disabled={selectedIngredients.length === 0}
                  >
                    Go
                  </button>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
