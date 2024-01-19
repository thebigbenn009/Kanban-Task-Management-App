import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSidebarOpen: true,
};
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});
export const sidebarActions = sidebarSlice.actions;
