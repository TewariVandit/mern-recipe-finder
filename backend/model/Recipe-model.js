import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    spices: { type: [String], default: [] },
    vegetables: { type: [String], default: [] },
    oil: { type: [String], default: [] },
    Meat: { type: [String], default: [] },
    DairyProducts: { type: [String], default: [] },
    Pulses: { type: [String], default: [] },
    Others: { type: [String], default: [] },
    instructions: { type: String, required: true },
    cookingTime: { type: String, required: true },
    imageUrl: { type: String },
    nutritionalInformation: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      carbohydrates: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
      sugar: { type: Number, default: 0 },
    },
    foodType: { type: String, enum: ['veg', 'non-veg'], required: true },
    recipeType: { type: String, enum: ['chapati', 'vegetable', 'sweet', 'fast food'], required: true },
    mealTime: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
    sourceLink: { type: String },
    videoLink: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
