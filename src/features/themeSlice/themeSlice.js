import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  darkMode: true,
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
});
export const themeActions = themeSlice.actions;
