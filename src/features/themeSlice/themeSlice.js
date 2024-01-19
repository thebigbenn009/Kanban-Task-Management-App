import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  darkMode: "dark",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state) {
      state.darkMode === "dark"
        ? (state.darkMode = "light")
        : (state.darkMode = "dark");
    },
  },
});
export const themeActions = themeSlice.actions;
