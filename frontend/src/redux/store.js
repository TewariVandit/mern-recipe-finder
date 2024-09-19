// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import recipesReducer from "./recipeSlice"; // Updated to use recipeSlice.js
import userProfileReducer from "./userProfileSlice";
import modalReducer from "./modal-slice"; 

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipesReducer, // Using new recipesReducer from recipeSlice
  userProfile: userProfileReducer,
  modal: modalReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
