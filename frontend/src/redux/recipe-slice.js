// src/redux/recipe-slice.js

import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
  },
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload;
    },
    clearRecipes(state) {
      state.recipes = [];
    },
  },
});

export const { setRecipes, clearRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
