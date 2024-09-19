// src/redux/userProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    profile: null,
  },
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload; // Save the user data in the profile
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
