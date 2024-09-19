import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe', // Reference to Recipe model
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  stars: {
    type: Number, // Rating from 1 to 5
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Default export for the Comment model
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
