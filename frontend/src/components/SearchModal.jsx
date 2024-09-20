import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState({
    spices: [],
    vegetables: [],
    oil: [],
    meat: [],
    dairyProducts: [],
    pulses: [],
    others: [],
  });
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Track current category index

  const navigate = useNavigate();

  // Fetch ingredients from the API
  const fetchIngredients = async () => {
    try {
      const response = await axios.get('https://mern-recipe-finder.onrender.com/api/v1/recipe/ingredients');
      const filteredData = {};
      for (const key in response.data) {
        const nonEmptyValues = response.data[key].filter(item => item.trim() !== '');
        if (nonEmptyValues.length > 0) {
          filteredData[key] = nonEmptyValues;
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

  const toggleIngredient = (ingredient, category) => {
    setSelectedIngredients((prev) => {
      
      const currentSelection = prev[category] || [];
      return {
        ...prev,
        [category]: currentSelection.includes(ingredient)
        ? currentSelection.filter(item => item !== ingredient)
        : [...currentSelection, ingredient]
      };
    });
  };

  const navigateToRecipes = () => {
    navigate('/recipes', { state: { filter: selectedIngredients } });
    setSelectedIngredients({
      spices: [],
      vegetables: [],
      oil: [],
      meat: [],
      dairyProducts: [],
      pulses: [],
      others: [],
    }); // Reset selected ingredients
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
                    item.trim() !== '' && (
                      <li key={index}>
                        <button
                          onClick={() => toggleIngredient(item, categories[currentCategoryIndex])}
                          className={`p-2 w-full text-left ${selectedIngredients[categories[currentCategoryIndex]].includes(item) ? 'bg-green-500 text-white' : 'bg-transparent'} text-black rounded`}
                        >
                          {item}
                        </button>
                      </li>
                    )
                  ))}
                </ul>

                {/* Next/Go Button */}
                {currentCategoryIndex < categories.length - 1 ? (
                  <button 
                    onClick={showNextCategory} 
                    className="bg-blue-600 text-white p-2 rounded mt-4"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={navigateToRecipes} 
                    className="bg-blue-600 text-white p-2 rounded mt-4"
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
