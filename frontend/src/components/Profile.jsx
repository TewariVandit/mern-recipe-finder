import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/auth-slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from './RecipeCard'; // Import the RecipeCard component

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [recipes, setRecipes] = useState([]);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/v1/user/logout', {}, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.data.success) {
                dispatch(logout());
                navigate('/login');
            } else {
                alert('Logout failed: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error logging out:", error);
            alert('An error occurred. Please try again.');
        }
    };

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/recipe'); // Update the URL if necessary
            if (response.data.success) {
                setRecipes(response.data.recipes); // Assuming the response contains a 'recipes' array
            } else {
                console.error('Failed to fetch recipes:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchRecipes();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <p>No profile data available. Please log in.</p>;
    }

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex flex-row mt-10 mb-10">
                {/* User Details Section */}
                <div className="w-2/5 p-4 rounded flex flex-col items-center">
                    {/* Avatar */}
                    <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center">
                        <span className="text-xl font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>

                {/* Right Section with User Details */}
                <div className="w-3/5 p-4 bg-white rounded flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                    <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                    <p className="text-lg"><strong>Address:</strong> {user.address}</p>
                    <p className="text-lg"><strong>Bio:</strong> {user.bio}</p>
                </div>
            </div>

            {/* Recipes Section
            <div className="p-4 bg-white rounded mt-4">
                <h2 className="text-2xl font-semibold underline mb-4 text-center">Your Recipes</h2>
                {recipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center'>No recipes found.</p>
                )}
            </div> */}
        </div>
    );
};

export default Profile;
