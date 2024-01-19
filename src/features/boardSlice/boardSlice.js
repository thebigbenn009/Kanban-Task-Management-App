import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";
const initialState = {
  data,
  boardData: {},
};

export const boardSlice = createSlice({
  name: "board-slice",
  initialState,
  reducers: {
    displayBoard(state, action) {
      state.boardData = state.data.boards.find(
        (board) => board.name === action.payload
      );
    },
  },
});

export const boardActions = boardSlice.actions;
