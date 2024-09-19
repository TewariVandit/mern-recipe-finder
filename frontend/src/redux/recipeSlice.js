// src/redux/recipeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    recipes: [],
    loading: false,
    error: null,
};

// Async thunk to fetch all recipes
export const fetchAllRecipes = createAsyncThunk(
    'recipes/fetchAll',
    async () => {
        const response = await axios.get('https://mern-recipe-finder.onrender.com/api/v1/recipe/recipes');
        return response.data.recipes; // Assuming the API returns an object with a "recipes" property
    }
);

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload; // Set fetched recipes
            })
            .addCase(fetchAllRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture any error
            });
    },
});

export default recipeSlice.reducer;
