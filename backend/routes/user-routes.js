import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Import authentication middleware if needed
import { 
    addUserProfile, 
    getUserProfile, 
    updateUserProfile, 
    loginUser, 
    logoutUser,
     // Import the new controller function
} from '../controllers/user-controller.js';
import { getUserRecipes } from '../controllers/recipe-controller.js';

const router = express.Router();

// Route for adding a new user profile
router.post('/add', addUserProfile);

// Route for logging in a user and returning a token
router.post('/login', loginUser);

// Route for logging out a user
router.post('/logout', logoutUser);

// Route for getting user profile by ID (requires authentication)
router.get('/:id', getUserProfile);

router.get('/:id/recipes', getUserRecipes);

// User routes
router.put('/update', updateUserProfile);

export default router;
