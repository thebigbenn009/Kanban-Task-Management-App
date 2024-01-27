import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSidebarOpen: true,
  isMobileMenuOpen: false,
};
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,

  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    openMobileMenu(state) {
      state.isMobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    },
  },
});
export const sidebarActions = sidebarSlice.actions;
