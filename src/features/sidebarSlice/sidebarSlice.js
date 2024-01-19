import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDarkMode: true,
  isSidebarOpen: true,
};
const sidebarSlice = createSlice({
  name: "sidebar-slice",
  initialState,
});
