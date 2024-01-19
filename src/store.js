import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./features/boardSlice/boardSlice";
import { themeSlice } from "./features/themeSlice/themeSlice";

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
