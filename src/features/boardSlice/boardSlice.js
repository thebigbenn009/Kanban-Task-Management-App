import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";
const initialState = {
  boardData: data,
};

export const boardSlice = createSlice({
  name: "board-slice",
  initialState,
  reducers: {
    donot(state) {
      return state;
    },
  },
});

export const boardActions = boardSlice.actions;
