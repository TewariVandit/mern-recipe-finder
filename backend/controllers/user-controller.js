import User from '../model/User-model.js';
import jwt from 'jsonwebtoken';

// Controller to login user and return token


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Create a token with a hardcoded secret for demonstration (for production, use a secure method)
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Send token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'None', // Adjust based on your needs
            path: '/',
            maxAge: 3600000 // 1 hour
        });

        // Send the response with user data and JWT
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
            token, // Include the JWT in the response
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};




// Controller to logout user
export const logoutUser = (req, res) => {
    res.clearCookie('token'); // Clear the JWT cookie
    return res.status(200).json({
        success: true,
        message: 'Logout successful',
    });
};


// Controller to add a new user profile
// Controller to add a new user profile
// Controller to add a new user profile
export const addUserProfile = async (req, res) => {
    try {
        const { name, email, password, address, bio } = req.body; // Added bio to destructured body

        // Validate the input
        if (!name || !email || !password || !address) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const user = new User({ name, email, password, address, bio }); // Include bio in user creation
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'User profile created successfully',
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                bio: user.bio, // Include bio in response
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(error);

        // Handle different types of errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists. Please use a different email address.',
            });
        } else if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again.',
            });
        }

        // Catch-all for other errors
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
            error: error.message, // Optional: include the error message for debugging
        });
    }
};

// Controller to update user profile

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.id; // Get the authenticated user ID
        const { name, email, address, bio, recipeId } = req.body;

        // Validate input
        if (!name || !email || !address) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields (name, email, address).',
            });
        }

        // Find user and update profile
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Update user details
        user.name = name;
        user.email = email;
        user.address = address;
        user.bio = bio || user.bio;

        // If recipeId is provided, add it to the user's recipes without overwriting existing ones
        if (recipeId) {
            if (!user.recipes.includes(recipeId)) { // Check if the recipeId is already in the array to avoid duplicates
                user.recipes.push(recipeId);
            }
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                bio: user.bio,
                recipes: user.recipes, // Include recipes in the response
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
        });
    }
};







// Controller to get user profile
// Controller to get user profile by ID

export const getUserProfile = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters

    try {
        // Fetch user profile from the database using the provided ID
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Return the user profile excluding sensitive information
        const { password, ...userProfile } = user._doc; // Exclude the password field

        return res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};