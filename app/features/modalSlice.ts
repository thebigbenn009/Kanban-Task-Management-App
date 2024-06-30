import { createSlice } from "@reduxjs/toolkit";
export interface ModalState {
  modalOpen: boolean;
  isBoardOpen: boolean;
}
const initialState: ModalState = {
  modalOpen: false,
  isBoardOpen: false
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
    openBoard(state){
state.isBoardOpen = true;
    }, 
    closeBoard(state){
state.isBoardOpen = false;
    }
    
  },
});
export const { openModal, closeModal, openBoard, closeBoard } = modalSlice.actions;
