import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addComment, deleteComment, updateComment } from '../controllers/comment-controller.js';

const router = express.Router();

// Route to add a comment
router.route("/:recipeId/comment").post(isAuthenticated, addComment);

// Route to delete a comment
router.route("/:recipeId/comment/:commentId").delete(isAuthenticated, deleteComment);

// Route to update a comment
router.route("/:recipeId/comment/:commentId").put(isAuthenticated, updateComment);

export default router;
