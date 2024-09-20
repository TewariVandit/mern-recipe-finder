import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Ensure you have this CSS file

const SimpleSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvC1pGhW7_BRwnGuBguLE99tfA0faYflekCA&s)',
    'url(https://images.moneycontrol.com/static-mcnews/2023/10/pexels-anil-sharma-10580198-770x433.jpg?impolicy=website&width=770&height=431)',
    'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzT0XmAaxxNzOrN-eakQkL2XmmlGdTcAfCq5avDN4iaafmbLT-gSk9WqcceaweQ2j78MU&usqp=CAU)',
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{ backgroundImage: images[currentIndex] }}
      />
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded shadow">
        Prev
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded shadow">
        Next
      </button>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const navigateToRecipes = (recipeType) => {
    navigate('/recipes', { state: { filter: { recipeType } } });
  };

  const navigateTomealTime = (mealTime) => {
    navigate('/recipes', { state: { filter: { mealTime } } });
  };

  const navigateTofoodType = (foodType) => {
    navigate('/recipes', { state: { filter: { foodType } } });
  };

  return (
    <>
      <SimpleSlider />

      <div className="home-container">
        <h2 className="text-2xl font-bold mb-5 text-center shadow-md">
          Select under premium categories:
        </h2>
        <div className="button-grid">
          <button
            onClick={() => navigateToRecipes('vegetable')}
            className="recipe-button vegetable"
          >
            <div className="icon" />
            <span className='text-white'>Vegetable</span>
          </button>
          <button
            onClick={() => navigateToRecipes('chapati')}
            className="recipe-button chapati"
          >
            <div className="icon" />
            <span className='text-white'>Chapati</span>
          </button>
          <button
            onClick={() => navigateToRecipes('sweet')}
            className="recipe-button sweet"
          >
            <div className="icon" />
            <span className='text-white'>Sweet</span>
          </button>
          <button
            onClick={() => navigateToRecipes('fast food')}
            className="recipe-button fast-food"
          >
            <div className="icon" />
            <span>Fast Food</span>
          </button>
        </div>
      </div>

      <div className="home-container">
        <h2 className="text-2xl font-bold mb-5 text-center shadow-md">
          Select Food According to Day Time:
        </h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button
            onClick={() => navigateTomealTime('breakfast')}
            className="recipe-button bg-blue-500 text-white rounded-lg w-full md:w-48 h-24 flex items-center justify-center shadow-lg relative"
          >
            <div className="icon" />
            <span className="text-xl font-semibold">Breakfast</span>
            <div className="bg-breakfast h-full w-full absolute inset-0 rounded-lg opacity-30"></div>
          </button>
          <button
            onClick={() => navigateTomealTime('lunch')}
            className="recipe-button bg-yellow-500 text-white rounded-lg w-full md:w-48 h-24 flex items-center justify-center shadow-lg relative"
          >
            <div className="icon" />
            <span className="text-xl font-semibold">Lunch</span>
            <div className="bg-lunch h-full w-full absolute inset-0 rounded-lg opacity-30"></div>
          </button>
          <button
            onClick={() => navigateTomealTime('dinner')}
            className="recipe-button bg-purple-500 text-white rounded-lg w-full md:w-48 h-24 flex items-center justify-center shadow-lg relative"
          >
            <div className="icon" />
            <span className="text-xl font-semibold">Dinner</span>
            <div className="bg-dinner h-full w-full absolute inset-0 rounded-lg opacity-30"></div>
          </button>
        </div>
      </div>


      <div className="home-container">
        <h2 className="text-2xl font-bold mb-5 text-center shadow-md">
          Select Food Type:
        </h2>
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col items-center w-1/2 h-35vh">
            <button
              onClick={() => navigateTofoodType('veg')}
              className="recipe-button bg-green-500 text-white rounded-lg h-full w-full flex items-center justify-center shadow-lg relative"
            >
              <div className="icon" />
              <span className="text-xl font-semibold">Veg</span>
              <div className="bg-veg h-full w-full absolute inset-0 rounded-lg opacity-30"></div>
            </button>
          </div>
          <div className="flex flex-col items-center w-1/2 h-35vh">
            <button
              onClick={() => navigateTofoodType('non-veg')}
              className="recipe-button bg-red-500 text-white rounded-lg h-full w-full flex items-center justify-center shadow-lg relative"
            >
              <div className="icon" />
              <span className="text-xl font-semibold">Non-Veg</span>
              <div className="bg-nonveg h-full w-full absolute inset-0 rounded-lg opacity-30"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
