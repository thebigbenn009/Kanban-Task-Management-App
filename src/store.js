import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./features/boardSlice/boardSlice";
import { themeSlice } from "./features/themeSlice/themeSlice";
import { sidebarSlice } from "./features/sidebarSlice/sidebarSlice";

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    theme: themeSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});

export default store;
