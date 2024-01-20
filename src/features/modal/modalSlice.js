import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addNewBoardModal: false,
  addNewTaskModal: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openNewBoardModal(state) {
      state.addNewBoardModal = true;
    },
    closeNewBoardModal(state) {
      state.addNewBoardModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
