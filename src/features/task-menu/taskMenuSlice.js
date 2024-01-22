import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isTaskMenuOpen: false,
};
export const taskMenuSlice = createSlice({
  name: "taskMenu",
  initialState,
  reducers: {
    openTaskMenu(state) {
      state.isTaskMenuOpen = true;
    },
  },
});
export const taskMenuActions = taskMenuSlice.actions;
