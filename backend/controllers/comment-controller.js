import Comment from '../model/Comment-model.js'; // Use default import
import Recipe from '../model/Recipe-model.js'; // Make sure this is also a default export

// Add Comment function and the rest of your code...

// Add Comment
export const addComment = async (req, res) => {
    try {
        const userId = req.id;  // This is coming from the authenticated user
        const recipeId = req.params.recipeId;  // This is coming from the route parameters
        const { commentText, stars } = req.body;

        // Check if recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found',
            });
        }

        // Initialize comments array if it's undefined
        if (!recipe.comments) {
            recipe.comments = [];
        }

        // Create new comment
        const newComment = await Comment.create({
            userId,  // Correct field name
            recipeId,  // Correct field name
            commentText,
            stars,
        });

        // Add comment to the recipe's comment array
        recipe.comments.push(newComment._id);
        await recipe.save();

        return res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: newComment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error adding comment',
            error: error.message,
        });
    }
};



// Update Comment
// Update Comment
export const updateComment = async (req, res) => {
    try {
        const userId = req.id; // This is the ID of the authenticated user
        const commentId = req.params.commentId; // This is the ID of the comment to update
        const { commentText, stars } = req.body; // Destructuring request body

        // Find the comment by ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        // Ensure the user is the owner of the comment
        if (comment.userId.toString() !== userId) { // Correct field name
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to update this comment',
            });
        }

        // Update comment fields only if they are provided
        if (commentText) comment.commentText = commentText;
        if (stars) comment.stars = stars;

        await comment.save(); // Save updated comment

        return res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            comment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating comment',
            error: error.message,
        });
    }
};


// Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const userId = req.id;  // Authenticated user ID
        const commentId = req.params.commentId;  // Comment ID from the route

        // Find the comment by ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        // Ensure the user is the owner of the comment
        if (comment.userId.toString() !== userId) {  // Make sure to use the correct field (userId)
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this comment',
            });
        }

        // Remove the comment reference from the recipe's comments array
        await Recipe.updateOne(
            { _id: comment.recipeId },  // Using correct reference (recipeId)
            { $pull: { comments: comment._id } }
        );

        // Delete the comment using `deleteOne()`
        await Comment.deleteOne({ _id: commentId });

        return res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting comment',
            error: error.message,
        });
    }
};


