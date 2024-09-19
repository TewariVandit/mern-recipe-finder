// src/redux/modal-slice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showSearchModal: false,
  },
  reducers: {
    openSearchModal: (state) => {
      state.showSearchModal = true;
    },
    closeSearchModal: (state) => {
      state.showSearchModal = false;
    },
  },
});

export const { openSearchModal, closeSearchModal } = modalSlice.actions;
export default modalSlice.reducer;
