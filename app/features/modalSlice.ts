import { createSlice } from "@reduxjs/toolkit";
export interface ModalState {
  modalOpen: boolean;
  isBoardOpen: boolean;
  isTaskOpen: boolean;
  isBoardMenuOpen: boolean;
  activeBoardId: string;
  isDeleteBoardOpen: boolean;
}
const initialState: ModalState = {
  modalOpen: false,
  isBoardOpen: false,
  isTaskOpen: false,
  isBoardMenuOpen: false,
  activeBoardId: "",
  isDeleteBoardOpen: false,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    openBoard(state) {
      state.isBoardOpen = true;
    },
    closeBoard(state) {
      state.isBoardOpen = false;
    },
    openTask(state) {
      state.isTaskOpen = true;
    },
    closeTask(state) {
      state.isTaskOpen = false;
    },
    setActiveClass(state, action) {
      state.activeBoardId = action.payload;
    },
    openBoardMenu(state) {
      state.isBoardMenuOpen = true;
    },
    closeBoardMenu(state) {
      state.isBoardMenuOpen = false;
    },
    toggleBoardMenu(state) {
      state.isBoardMenuOpen = !state.isBoardMenuOpen;
    },
    openDeleteBoard(state) {
      state.isDeleteBoardOpen = true;
    },
    closeDeleteBoard(state) {
      state.isDeleteBoardOpen = false;
    },
  },
});
export const {
  openModal,
  closeModal,
  openBoard,
  closeBoard,
  setActiveClass,
  openTask,
  closeTask,
  closeBoardMenu,
  openBoardMenu,
  toggleBoardMenu,
  closeDeleteBoard,
  openDeleteBoard,
} = modalSlice.actions;
