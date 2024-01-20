import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";
import { nanoid } from "nanoid";
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
    addNewBoard(state, action) {
      const newBoard = { id: nanoid(), ...action.payload };
      state.data.boards = [...state.data.boards, newBoard];
      console.log(state.data.boards);
    },

    addNewTask(state, action) {
      const payLoadWithID = {
        ...action.payload,
        subtasks: action.payload.subtasks.map((subtask) => {
          return { id: nanoid(), ...subtask, isCompleted: false };
        }),
      };
      const newTask = {
        id: nanoid(),
        ...payLoadWithID,
      };
    },
  },
});

export const boardActions = boardSlice.actions;
