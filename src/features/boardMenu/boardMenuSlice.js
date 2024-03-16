import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editBoardModal: false,
  deleteBoardModal: false,
  isBoardMenuOpen: false,
};
export const boardMenuSlice = createSlice({
  name: "boardMenu",
  initialState,
  reducers: {
    toggleBoardMenu(state) {
      state.isBoardMenuOpen = !state.isBoardMenuOpen;
    },
    closeEditBoardMenu(state) {
      state.isBoardMenuOpen = false;
    },
    openEditBoardModal(state) {
      state.editBoardModal = true;
    },
    closeEditBoardModal(state) {
      state.editBoardModal = false;
    },
    openDeleteBoardModal(state) {
      state.deleteBoardModal = true;
    },
    closeDeleteBoardModal(state) {
      state.deleteBoardModal = false;
    },
  },
});
export const boardMenuActions = boardMenuSlice.actions;
