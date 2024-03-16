import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isTaskMenuOpen: false,
  isEditTaskOpen: false,
  isDeleteTaskOpen: false,
};
export const taskMenuSlice = createSlice({
  name: "taskMenu",
  initialState,
  reducers: {
    toggleTaskMenu(state) {
      state.isTaskMenuOpen = !state.isTaskMenuOpen;
    },
    closeTaskMenu(state) {
      state.isTaskMenuOpen = false;
    },
    openEditTask(state) {
      state.isEditTaskOpen = true;
    },
    closeEditTask(state) {
      state.isEditTaskOpen = false;
    },
    openDeleteTask(state) {
      state.isDeleteTaskOpen = true;
    },
    closeDeleteTask(state) {
      state.isDeleteTaskOpen = false;
    },
  },
});
export const taskMenuActions = taskMenuSlice.actions;
