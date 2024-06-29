import { createSlice } from "@reduxjs/toolkit";
export interface ModalState {
  modalOpen: boolean;
}
const initialState: ModalState = {
  modalOpen: false,
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
  },
});
export const { openModal, closeModal } = modalSlice.actions;
