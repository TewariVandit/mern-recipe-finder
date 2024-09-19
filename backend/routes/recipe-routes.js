import express from 'express';
import upload from '../middlewares/multer.js'; // For handling image uploads
import {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipes,
    getUserRecipes,
    getRecipeById,
    getAllRecipes,
    getAllOrFilteredRecipes,
    getAllIngredients,
} from '../controllers/recipe-controller.js';

const router = express.Router();

// Route for filtering recipes
router.get('/filter', getAllOrFilteredRecipes);

// Route to get all recipes
router.get('/recipes', getAllRecipes); 

// Route for creating a new recipe
router.route("/add").post(upload.single('image'), createRecipe);

router.get('/ingredients', getAllIngredients);

// Route for deleting a recipe
router.delete('/delete/:id', deleteRecipe);

// Route for getting a single recipe by ID
router.get('/recipes/:id', getRecipeById); // Updated to avoid conflict

// Route for updating a recipe (with optional image upload)
router.put('/update/:id', upload.single('image'), updateRecipe);

// Route for searching recipes based on criteria
router.route("/search").post(searchRecipes);

// Route to get all user recipes
router.get('/user/recipes', getUserRecipes); // Use a different path to avoid confusion

export default router;
