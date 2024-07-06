import { createSlice } from "@reduxjs/toolkit";
export interface ModalState {
  modalOpen: boolean;
  isBoardOpen: boolean;
  activeBoardId: string;
}
const initialState: ModalState = {
  modalOpen: false,
  isBoardOpen: false,
  activeBoardId: "",
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
    setActiveClass(state, action) {
      state.activeBoardId = action.payload;
    },
  },
});
export const { openModal, closeModal, openBoard, closeBoard, setActiveClass } =
  modalSlice.actions;
