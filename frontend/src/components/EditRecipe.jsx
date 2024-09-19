import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState({
        name: '',
        description: '',
        instructions: '',
        cookingTime: '',
        image: null,
        nutritionalInformation: {
            calories: '',
            protein: '',
            carbs: '',
            fat: '',
            fiber: '',
            sugar: '',
        },
        foodType: '',
        recipeType: '',
        mealTime: '',
        videoLink: '',
        spices: [],
        vegetables: [],
        oil: [],
        meat: [],
        dairyProducts: [],
        pulses: [],
        others: [],
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/recipe/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
    
                const data = await response.json();
                setRecipeData(data.recipe || {}); // Set fetched recipe data safely
            } catch (error) {
                console.error("Failed to fetch recipe:", error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in recipeData.nutritionalInformation) {
            setRecipeData((prev) => ({
                ...prev,
                nutritionalInformation: {
                    ...prev.nutritionalInformation,
                    [name]: value,
                },
            }));
        } else {
            setRecipeData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleIngredientChange = (type, index, value) => {
        const updatedIngredients = [...recipeData[type]];
        updatedIngredients[index] = value;
        setRecipeData((prev) => ({
            ...prev,
            [type]: updatedIngredients,
        }));
    };

    const addIngredientField = (type) => {
        setRecipeData((prev) => ({
            ...prev,
            [type]: [...prev[type], ''],
        }));
    };

    const removeIngredientField = (type, index) => {
        const updatedIngredients = recipeData[type].filter((_, i) => i !== index);
        setRecipeData((prev) => ({
            ...prev,
            [type]: updatedIngredients,
        }));
    };

    const handleFileChange = (e) => {
        setRecipeData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append each key in the recipeData to formData
        for (const key in recipeData) {
            if (key === 'nutritionalInformation') {
                for (const nutrient in recipeData.nutritionalInformation) {
                    formData.append(`nutritionalInformation[${nutrient}]`, recipeData.nutritionalInformation[nutrient]);
                }
            } else if (Array.isArray(recipeData[key])) {
                formData.append(key, recipeData[key].join(',')); // Join array fields with commas
            } else {
                formData.append(key, recipeData[key]);
            }
        }

        if (recipeData.image) {
            formData.append('image', recipeData.image);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/recipe/update/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                navigate(`/recipe/${id}`); // Redirect to recipe view page
            } else {
                console.error('Failed to update recipe');
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div>
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Recipe Name"
                    value={recipeData.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={recipeData.description}
                    onChange={handleChange}
                    required
                />
                
                <h2>Ingredients</h2>
                {['spices', 'vegetables', 'oil', 'meat', 'dairyProducts', 'pulses', 'others'].map((type) => (
                    <div key={type}>
                        <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                        {(recipeData[type] || []).map((ingredient, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(type, index, e.target.value)}
                                />
                                <button type="button" onClick={() => removeIngredientField(type, index)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addIngredientField(type)}>+</button>
                    </div>
                ))}

                <h2>Instructions</h2>
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={recipeData.instructions}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="cookingTime"
                    placeholder="Cooking Time (minutes)"
                    value={recipeData.cookingTime}
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />

                <h2>Nutritional Information</h2>
                {Object.keys(recipeData.nutritionalInformation).map((key) => (
                    <input
                        key={key}
                        type="number"
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={recipeData.nutritionalInformation[key]}
                        onChange={handleChange}
                    />
                ))}

                <select name="foodType" value={recipeData.foodType} onChange={handleChange} required>
                    <option value="">Select Food Type</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non-Veg</option>
                </select>

                <select name="recipeType" value={recipeData.recipeType} onChange={handleChange} required>
                    <option value="">Select Recipe Type</option>
                    <option value="sweet">Sweet</option>
                    <option value="vegetable">Vegetable</option>
                    <option value="chapati">Chapati</option>
                    <option value="fast food">Fast Food</option>
                </select>

                <select name="mealTime" value={recipeData.mealTime} onChange={handleChange} required>
                    <option value="">Select Meal Time</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>

                <input
                    type="text"
                    name="videoLink"
                    placeholder="Video Link"
                    value={recipeData.videoLink}
                    onChange={handleChange}
                />

                <button type="submit">Update Recipe</button>
            </form>
        </div>
    );
};

export default EditRecipe;
