import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <Link to={`/recipe/${recipe._id}`}  >
            <div className="border rounded shadow-md overflow-hidden text-black">
                {/* Image and Badge */}
                <div className="relative">
                    <img src={recipe.videoLink} alt={recipe.name} className="w-full h-48 object-cover" />
                    <span className={`absolute top-2 left-2 bg-${recipe.foodType === 'veg' ? 'green' : 'red'}-600 text-white text-xs font-bold px-2 rounded`}>
                        {recipe.foodType}
                    </span>
                </div>

                {/* Recipe Details */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{recipe.name}</h3>
                    <p className="text-gray-600">{recipe.description.split(' ').slice(0, 10).join(' ')}{recipe.description.split(' ').length > 10 ? '...' : ''}</p>
                    <p className="mt-2 text-sm text-gray-500"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>



                    


                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
