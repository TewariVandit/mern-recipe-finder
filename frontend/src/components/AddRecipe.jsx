import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    spices: [''],
    vegetables: [''],
    oil: [''],
    Meat: [''],
    DairyProducts: [''],
    Pulses: [''],
    Others: [''],
    instructions: '',
    cookingTime: '',
    image: null,
    nutritionalInformation: { calories: '', protein: '', fat: '', carbohydrates: '', fiber: '', sugar: '' },
    foodType: '',
    recipeType: '',
    mealTime: '',
    sourceLink: '',
    videoLink: '',
  });

  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in recipeData.nutritionalInformation) {
      setRecipeData((prevData) => ({
        ...prevData,
        nutritionalInformation: {
          ...prevData.nutritionalInformation,
          [name]: value,
        },
      }));
    } else {
      setRecipeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setRecipeData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleIngredientChange = (type, index, value) => {
    const updatedIngredients = [...recipeData[type]];
    updatedIngredients[index] = value;
    setRecipeData((prevData) => ({
      ...prevData,
      [type]: updatedIngredients,
    }));
  };

  const addIngredientField = (type) => {
    setRecipeData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], ''],
    }));
  };

  const removeIngredientField = (type, index) => {
    const updatedIngredients = recipeData[type].filter((_, i) => i !== index);
    setRecipeData((prevData) => ({
      ...prevData,
      [type]: updatedIngredients,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', recipeData.name);
    formData.append('description', recipeData.description);
    formData.append('spices', JSON.stringify(recipeData.spices));
    formData.append('vegetables', JSON.stringify(recipeData.vegetables));
    formData.append('oil', JSON.stringify(recipeData.oil));
    formData.append('Meat', JSON.stringify(recipeData.Meat));
    formData.append('DairyProducts', JSON.stringify(recipeData.DairyProducts));
    formData.append('Pulses', JSON.stringify(recipeData.Pulses));
    formData.append('Others', JSON.stringify(recipeData.Others));
    formData.append('instructions', recipeData.instructions);
    formData.append('cookingTime', recipeData.cookingTime);
    formData.append('image', recipeData.image);
    formData.append('nutritionalInformation', JSON.stringify(recipeData.nutritionalInformation)); // Ensure this is JSON
    formData.append('foodType', recipeData.foodType);
    formData.append('recipeType', recipeData.recipeType);
    formData.append('mealTime', recipeData.mealTime);
    formData.append('sourceLink', recipeData.sourceLink);
    formData.append('videoLink', recipeData.videoLink);
    formData.append('createdBy', userId);

    try {
      const response = await axios.post('https://mern-recipe-finder.onrender.com/api/v1/recipe/add', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe added successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error adding recipe: ${error.response.data.message}`);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg mt-5 shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipeData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={recipeData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        {['spices', 'vegetables', 'oil', 'Meat', 'DairyProducts', 'Pulses', 'Others'].map((type) => (
          <div key={type} className="mb-4">
            <h3 className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            {recipeData[type].map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(type, index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button type="button" onClick={() => removeIngredientField(type, index)} className="ml-2 bg-[transparent] shadow-none text-red-500">Delete</button>
              </div>
            ))}
            <button type="button" onClick={() => addIngredientField(type)} className="text-blue-600 bg-[transparent] shadow-none">Add Ingredient</button>
          </div>
        ))}

        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipeData.instructions}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="number"
          name="cookingTime"
          placeholder="Cooking Time (minutes)"
          value={recipeData.cookingTime}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        

        <h2 className="text-xl font-semibold mb-2">Nutritional Information</h2>
        {Object.keys(recipeData.nutritionalInformation).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={recipeData.nutritionalInformation[key]}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />
        ))}

        <div className='flex justify-around items-center sd'>

          <select name="foodType" value={recipeData.foodType} onChange={handleChange} required className="w-full p-2 border rounded mb-4">
            <option value="">Select Food Type</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <select name="recipeType" value={recipeData.recipeType} onChange={handleChange} required className="w-full p-2 border rounded mb-4">
            <option value="">Select Recipe Type</option>
            <option value="sweet">Sweet</option>
            <option value="vegetable">Vegetable</option>
            <option value="chapati">Chapati</option>
            <option value="fast food">Fast Food</option>
          </select>

          <select name="mealTime" value={recipeData.mealTime} onChange={handleChange} required className="w-full p-2 border rounded mb-4">
            <option value="">Select Meal Time</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <input
          type="text"
          name="videoLink"
          placeholder="Image url"
          value={recipeData.videoLink}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
