// src/redux/userProfileSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearUserProfile(state) {
      state.profile = null;
    },
  },
});

export const { setUserProfile, setLoading, setError, clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
