import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creator, setCreator] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`https://mern-recipe-finder.onrender.com/api/v1/recipe/recipes/${id}`);
                setRecipe(response.data);

                // Now use response.data to fetch creator details
                if (response.data && response.data.createdBy) {
                    const creatorResponse = await axios.get(`https://mern-recipe-finder.onrender.com/api/v1/user/${response.data.createdBy}`);
                    setCreator(creatorResponse.data);
                }
            } catch (err) {
                console.error('Error fetching recipe:', err);
                setError(err.response ? err.response.data.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div className="recipe-detail-container flex">
            {/* Left Side */}
            <div className="w-full md:w-9/12 p-6 bg-light-green rounded-lg shadow-lg">
                {/* First Div: Image and Recipe Info */}
                <div className="flex flex-col md:flex-row items-start">
                    <div className="w-full md:w-1/2">
                        <img src={recipe.videoLink} alt={recipe.name} className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <div className="w-full md:w-1/2 pl-4 mt-4 md:mt-0">
                        <h2 className="text-2xl font-bold text-primary-green mb-2">{recipe.name}</h2>
                        <p className="text-gray-700 mb-2">{recipe.description}</p>
                        <p className="text-gray-800 font-semibold">
                            <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                        </p>
                    </div>
                </div>

                {/* Second Div: Instructions */}
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-xl font-semibold text-primary-green mb-2">Instructions</h3>
                    <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
                </div>

                {/* Third Div: Nutritional Information Table */}
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-xl font-semibold text-primary-green mb-2">Nutritional Information</h3>
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Nutrient</th>
                                <th className="border border-gray-300 px-4 py-2">Amount (g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.nutritionalInformation && (
                                Object.entries(recipe.nutritionalInformation).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="border border-gray-300 px-4 py-2">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                                        <td className="border border-gray-300 px-4 py-2">{value}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-3/12 p-4 bg-[#F2F9E5] shadow-md">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Creator:</h3>
                    {creator ? (
                        <div className="mt-2 flex flex-col items-center text-center">
                            <img
                                src={creator?.avatarUrl || 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='}
                                alt={creator?.name}
                                className="w-16 h-16 rounded-full border-4 border-dark-green"
                            />
                            <p className="text-gray-700 font-bold">{creator.name}</p>
                            <p className="text-gray-600">{creator.bio}</p>
                            <p className="text-gray-600">{creator.email}</p>
                        </div>
                    ) : (
                        <p className="text-gray-600">Creator information not available.</p>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Ingredients:</h3>
                    <div className="mt-2">
                        {recipe.vegetables && recipe.vegetables.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Vegetables:</strong>
                                <p className="text-gray-600">{recipe.vegetables.join(', ')}</p>
                            </div>
                        )}
                        {recipe.spices && recipe.spices.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Spices:</strong>
                                <p className="text-gray-600">{recipe.spices.join(', ')}</p>
                            </div>
                        )}
                        {recipe.oil && recipe.oil.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Oil:</strong>
                                <p className="text-gray-600">{recipe.oil.join(', ')}</p>
                            </div>
                        )}
                        {recipe.meat && recipe.meat.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Meat:</strong>
                                <p className="text-gray-600">{recipe.meat.join(', ')}</p>
                            </div>
                        )}
                        {recipe.dairyProducts && recipe.dairyProducts.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Dairy Products:</strong>
                                <p className="text-gray-600">{recipe.dairyProducts.join(', ')}</p>
                            </div>
                        )}
                        {recipe.pulses && recipe.pulses.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Pulses:</strong>
                                <p className="text-gray-600">{recipe.pulses.join(', ')}</p>
                            </div>
                        )}
                        {recipe.others && recipe.others.length > 0 && (
                            <div className="mb-2">
                                <strong className="text-gray-700">Others:</strong>
                                <p className="text-gray-600">{recipe.others.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Meal Types */}
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">Meal Type:</h3>
                    <div className="mt-2">
                        <span className="text-gray-800 capitalize bg-gray-200 px-3 py-2 rounded-md mt-2 block">
                            {recipe.foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                        </span>
                        <br />
                        <span className="text-gray-800 capitalize bg-gray-200 px-3 py-2 rounded-md mt-2 block">
                            {recipe.mealTime}
                        </span>
                        <br />
                        <span className="text-gray-800 capitalize bg-gray-200 px-3 py-2 rounded-md mt-2 block">
                            {recipe.recipeType}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
