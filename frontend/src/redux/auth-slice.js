import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  user: null,
  token: null, // Field to store JWT
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to log in the user
    login(state, action) {
      state.user = action.payload.user; // Store user data
      state.token = action.payload.token; // Store token
      state.isAuthenticated = true; // Set authentication status
    },
    // Action to log out the user
    logout(state) {
      state.user = null; // Clear user data
      state.token = null; // Clear token on logout
      state.isAuthenticated = false; // Update authentication status
    },
    // Action to update user information
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // Merge existing user data with updated data
      }
    },
  },
});

// Export actions to use in components
export const { login, logout, updateUser } = authSlice.actions;

// Export the reducer to use in the store
export default authSlice.reducer;
