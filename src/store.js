import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./features/boardSlice/boardSlice";
import { themeSlice } from "./features/themeSlice/themeSlice";
import { sidebarSlice } from "./features/sidebarSlice/sidebarSlice";
import { modalSlice } from "./features/modal/modalSlice";
import { taskMenuSlice } from "./features/task-menu/taskMenuSlice";
import { boardMenuSlice } from "./features/boardMenu/boardMenuSlice";

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    theme: themeSlice.reducer,
    sidebar: sidebarSlice.reducer,
    modal: modalSlice.reducer,
    taskMenu: taskMenuSlice.reducer,
    boardMenu: boardMenuSlice.reducer,
  },
});

export default store;
