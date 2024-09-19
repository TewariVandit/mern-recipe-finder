import getDataUri from '../utils/getDataUri.js'; // Use default import
import cloudinary from '../utils/cloudinary.js'; // Import your cloudinary configuration
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Your authentication middleware
import mongoose from 'mongoose';
import Recipe from '../model/Recipe-model.js'; // Adjust the path as necessary

// Function to parse ingredients from the request body
const parseIngredients = (ingredientsObj) => {
    const parsedIngredients = {};
    for (const key in ingredientsObj) {
        if (Array.isArray(ingredientsObj[key])) {
            parsedIngredients[key] = ingredientsObj[key].join(','); // Join array items into a string
        } else {
            throw new Error(`${key} should be an array`);
        }
    }
    return parsedIngredients;
};

// Create a new recipe

export const createRecipe = async (req, res) => {
    try {
        const {
            name,
            description,
            spices,
            vegetables,
            oil,
            Meat,
            DairyProducts,
            Pulses,
            Others,
            instructions,
            cookingTime,
            foodType,
            recipeType,
            mealTime,
            sourceLink,
            videoLink,
            nutritionalInformation,
            createdBy,
        } = req.body;
        console.log(req.body);
        

        const recipe = new Recipe({
            name,
            description,
            spices: JSON.parse(spices),
            vegetables: JSON.parse(vegetables),
            oil: JSON.parse(oil),
            Meat: JSON.parse(Meat),
            DairyProducts: JSON.parse(DairyProducts),
            Pulses: JSON.parse(Pulses),
            Others: JSON.parse(Others),
            instructions,
            cookingTime,
            foodType,
            recipeType,
            mealTime,
            sourceLink,
            videoLink,
            nutritionalInformation: JSON.parse(nutritionalInformation),
            createdBy,
        });

        await recipe.save();
        res.status(201).json({ success: true, data: recipe });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRecipeById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid recipe ID.' });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }
        return res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




export const searchByIngredients = async (req, res) => {
    try {
        console.log("HJ");
        
        const { selectedIngredients, matchPercentageThreshold } = req.body;

        const recipes = await Recipe.find(); // Retrieve all recipes

        const matchedRecipes = [];

        recipes.forEach(recipe => {
            let matchCount = 0;

            // Calculate total ingredients for matching
            const totalIngredients = Object.values(recipe.ingredients[0]).flat().length;

            // Check each category of ingredients
            Object.keys(selectedIngredients).forEach(category => {
                const userIngredients = selectedIngredients[category];

                if (recipe.ingredients[0][category]) {
                    userIngredients.forEach(ingredient => {
                        if (recipe.ingredients[0][category].includes(ingredient)) {
                            matchCount++;
                        }
                    });
                }
            });

            const matchPercentage = (matchCount / totalIngredients) * 100;

            // Check if the match percentage meets the user's threshold
            if (matchPercentage >= matchPercentageThreshold) {
                matchedRecipes.push({
                    recipe,
                    matchPercentage,
                });
            }
        });

        // Sort matched recipes by match percentage (descending)
        matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

        return res.status(200).json({
            success: true,
            matchedRecipes,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Controller to fetch all recipes for a specific user
export const getUserRecipes = async (req, res) => {
    const userId = req.params.id; // Get user ID from request parameters

    try {
        // Fetch all recipes created by the user
        const recipes = await Recipe.find({ createdBy: userId });

        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ success: false, message: 'No recipes found for this user.' });
        }

        res.status(200).json({ success: true, recipes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};


// Delete a recipe
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(200).json({ success: true, message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update a recipe
export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        instructions,
        cookingTime,
        foodType,
        recipeType,
        mealTime,
        videoLink,
        spices,
        vegetables,
        oil,
        meat,
        dairyProducts,
        pulses,
        others,
        nutritionalInformation
    } = req.body;

    // Check if a new image was uploaded
    const imageUrl = req.file ? req.file.path : undefined;

    try {
        // Find and update the recipe with new values
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                name,
                description,
                instructions,
                cookingTime,
                imageUrl, // Include imageUrl if it exists
                foodType,
                recipeType,
                mealTime,
                videoLink,
                spices,
                vegetables,
                oil,
                meat,
                dairyProducts,
                pulses,
                others,
                nutritionalInformation
            },
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        res.status(200).json({ success: true, recipe: updatedRecipe });
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getAllIngredients = async (req, res) => {
    try {
        const recipes = await Recipe.find({});

        const ingredients = {
            spices: [],
            vegetables: [],
            oil: [],
            meat: [],
            dairyProducts: [],
            pulses: [],
            others: []
        };

        recipes.forEach(recipe => {
            ingredients.spices.push(...recipe.spices);
            ingredients.vegetables.push(...recipe.vegetables);
            ingredients.oil.push(...recipe.oil);
            ingredients.meat.push(...recipe.Meat); // Ensure you match the case
            ingredients.dairyProducts.push(...recipe.DairyProducts);
            ingredients.pulses.push(...recipe.Pulses);
            ingredients.others.push(...recipe.Others);
        });

        // Remove duplicates
        Object.keys(ingredients).forEach(key => {
            ingredients[key] = [...new Set(ingredients[key])];
        });

        res.json(ingredients);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        res.status(500).json({ message: 'Error fetching ingredients' });
    }
};


// Search recipes based on meal time, recipe type, cooking time, and ingredients
export const searchRecipes = async (req, res) => {
    try {
        const { mealTime, recipeType, cookingTime, name, matchPercentageThreshold } = req.body; // Extract search parameters

        const query = {};

        if (mealTime) query.mealTime = mealTime;
        if (recipeType) query.recipeType = recipeType;
        if (cookingTime) query.cookingTime = { $lte: cookingTime }; // Search for recipes with cooking time less than or equal to specified time
        if (name) query.name = { $regex: name, $options: 'i' }; // Case-insensitive search by name

        const recipes = await Recipe.find(query).sort({ createdAt: -1 }); // Sort by createdAt in descending order

        return res.status(200).json({
            success: true,
            recipes,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.status(200).json({
            success: true,
            recipes,
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};


export const getAllOrFilteredRecipes = async (req, res) => {
    try {
        const { foodType, recipeType, mealTime, cookingTime } = req.query;

        // Initialize an empty query object
        const query = {};

        // Build the query based on provided parameters
        if (foodType && foodType.trim()) {
            query.foodType = foodType;
        }
        if (recipeType && recipeType.trim()) {
            query.recipeType = recipeType;
        }
        if (mealTime && mealTime.trim()) {
            query.mealTime = mealTime;
        }
        if (cookingTime && !isNaN(cookingTime)) {
            query.cookingTime = { $lte: Number(cookingTime) }; // Convert to number for comparison
        }

        // Fetch recipes based on the query, sorted by creation date descending
        const recipes = await Recipe.find(Object.keys(query).length ? query : {}).sort({ createdAt: -1 });

        // Send the filtered or all recipes
        return res.status(200).json({ recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
