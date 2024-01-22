import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  addNewBoardModal: false,
  addNewTaskModal: false,
  viewTaskModal: false,
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
    openNewTaskModal(state) {
      state.addNewTaskModal = true;
    },
    closeNewTaskModal(state) {
      state.addNewTaskModal = false;
    },
    openViewTaskModal(state) {
      state.viewTaskModal = true;
    },
    closeViewTaskModal(state) {
      state.viewTaskModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;
