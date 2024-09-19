import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard'; // Import the RecipeCard component
import { Link, useLocation } from 'react-router-dom';
import './Recipes.css';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        foodType: null,
        recipeType: null,
        mealTime: null,
        cookingTime: null,
    });

    const location = useLocation();
    const initialFilter = location.state?.filter || { mealTime: null };
    console.log('Received filter:', initialFilter);

    const fetchFilteredRecipes = async () => {
        setLoading(true);
        setError(null);
    
        try {
            const query = new URLSearchParams();
            const activeFilter = filter.foodType || filter.recipeType || filter.mealTime || filter.cookingTime
                ? filter
                : initialFilter;

            if (activeFilter) {
                if (activeFilter.foodType) query.append('foodType', activeFilter.foodType);
                if (activeFilter.recipeType) query.append('recipeType', activeFilter.recipeType);
                if (activeFilter.mealTime) query.append('mealTime', activeFilter.mealTime);
                if (activeFilter.cookingTime) query.append('cookingTime', activeFilter.cookingTime);
            }

            console.log(query.toString());
            const response = await axios.get(`http://localhost:8000/api/v1/recipe/filter?${query.toString()}`);
            setRecipes(response.data.recipes || []);
        } catch (err) {
            console.error('Error fetching filtered recipes:', err);
            setError(err.response ? err.response.data.message : 'An error occurred');
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFilteredRecipes(); // Fetch all recipes on component mount
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchFilteredRecipes(); // Fetch recipes based on the new filter
    };

    if (loading) return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );
    if (error) return <h1>Error: {error}</h1>;

    return (
        <div className="recipes-container min-h-[100vh]">
            <form onSubmit={handleFilterSubmit} className="filter-section">
                <h3>Filter by Type</h3>
                <select className="border-[#4CAF50] border-2 px-4 py-2" name="foodType" onChange={handleFilterChange} value={filter.foodType || ''}>
                    <option value="">Select Food Type</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                </select>

                <h3>Recipe Type</h3>
                <select className="border-[#4CAF50] border-2 px-4 py-2" name="recipeType" onChange={handleFilterChange} value={filter.recipeType || ''}>
                    <option value="">Select Recipe Type</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="chapati">Chapati</option>
                    <option value="sweet">Sweet</option>
                    <option value="fast food">Fast Food</option>
                </select>

                <h3>Meal Time</h3>
                <select className="border-[#4CAF50] border-2 px-4 py-2" name="mealTime" onChange={handleFilterChange} value={filter.mealTime || ''}>
                    <option value="">Select Meal Time</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>

                <br />
                <button className='mt-5 px-4 py-2' type="submit">Go</button>
            </form>

            <div className="cards-section">
                {recipes.length > 0 ? (
                    <ul className="recipe-grid">
                        {recipes.map(recipe => (
                            <li key={recipe._id} className="recipe-card">
                                <Link
                                    to={{
                                        pathname: `/recipe/${recipe._id}`,
                                        state: { filter } // Pass the filter parameters
                                    }}
                                >
                                    <RecipeCard recipe={recipe} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
};

export default Recipes;
