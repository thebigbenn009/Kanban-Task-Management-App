import { createSlice, current } from "@reduxjs/toolkit";
import data from "../../data.json";
import { nanoid } from "nanoid";

const initialState = {
  data,
  boardData: {},
  currentTask: {},
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
      const columnToBeUpdated = state.boardData.columns.find(
        (column) => column.name === action.payload.status
      );

      columnToBeUpdated.tasks = [action.payload, ...columnToBeUpdated.tasks];

      state.boardData.columns = state.boardData.columns.map((column) =>
        column.name === columnToBeUpdated.name ? columnToBeUpdated : column
      );
      state.data.boards = state.data.boards.map((board) =>
        board.name === state.boardData.name ? state.boardData : board
      );
    },
    displayTask(state, action) {
      //select the column to be updated
      const { column, task } = action.payload;
      const columnToBeUpdated = state.boardData.columns.find(
        (singleColumn) => singleColumn.name === column.name
      );
      state.currentTask = columnToBeUpdated.tasks.find(
        (singleTask) => singleTask.id === task.id
      );
    },
    updateCheckboxChange(state, action) {
      const subtaskToBeUpdated = state.currentTask.subtasks.find(
        (subtask) => subtask.id === action.payload
      );
      subtaskToBeUpdated.isCompleted = !subtaskToBeUpdated.isCompleted;
      state.currentTask.subtasks = state.currentTask.subtasks.map((subtask) =>
        subtask.id === action.payload ? subtaskToBeUpdated : subtask
      );
      const columnToBeUpdated = state.boardData.columns.find(
        (column) => column.name === state.currentTask.status
      );
      columnToBeUpdated.tasks = columnToBeUpdated.tasks.map((currTask) =>
        currTask.id === state.currentTask.id ? state.currentTask : currTask
      );
      state.boardData.columns = state.boardData.columns.map((column) =>
        column.name === columnToBeUpdated.name ? columnToBeUpdated : column
      );
    },
    updateTaskStatus(state, action) {
      const newStatus = action.payload;
      //If the status is actually changing
      if (state.currentTask.status !== newStatus) {
        //remove the task from the current column
        const currentColumn = state.boardData.columns.find(
          (column) => column.name === state.currentTask.status
        );
        currentColumn.tasks = currentColumn.tasks.filter(
          (task) => task.id !== state.currentTask.id
        );
        //update current task status
        state.currentTask.status = newStatus;
        //find corresponding column of the new status
        const newColumn = state.boardData.columns.find(
          (column) => column.name === newStatus
        );
        //Add task to the new column
        newColumn.tasks = [state.currentTask, ...newColumn.tasks];

        //update the state
        state.boardData.columns = state.boardData.columns.map((column) =>
          column.name === currentColumn.name ? currentColumn : column
        );
        state.boardData.columns = state.boardData.columns.map((column) =>
          column.name === newColumn.name ? newColumn : column
        );
      }
    },
    editTask(state, action) {
      //get the currentTask
      const updatedTask = action.payload;

      //if we are actually changing columns;
      if (updatedTask.status !== state.currentTask.status) {
        //find the previous column
        const previousColumn = state.boardData.columns.find(
          (column) => column.name === state.currentTask.status
        );

        //remove the current task from previous column
        previousColumn.tasks = previousColumn.tasks.filter(
          (task) => task.id !== state.currentTask.id
        );

        //find the corresponding column for the updated task status
        const correspondingColumn = state.boardData.columns.find(
          (column) => column.name === updatedTask.status
        );

        //add updated task to corresponding column
        correspondingColumn.tasks = [updatedTask, ...correspondingColumn.tasks];

        //update the board state with the modified columns
        state.boardData.columns = state.boardData.columns.map((column) =>
          column.name === previousColumn.name ? previousColumn : column
        );
        state.boardData.columns = state.boardData.columns.map((column) =>
          column.name === correspondingColumn.name
            ? correspondingColumn
            : column
        );
      } else {
        //if only other properties of the task are updated (not the status)
        //update the current task and the corresponding task in its column
        state.currentTask = updatedTask;
        const columnToBeUpdated = state.boardData.columns.find(
          (column) => column.name === updatedTask.status
        );
        columnToBeUpdated.tasks = columnToBeUpdated.tasks.map((task) =>
          task.id === updatedTask.id ? state.currentTask : task
        );
        state.boardData.columns = state.boardData.columns.map((column) =>
          column.name === columnToBeUpdated.name ? columnToBeUpdated : column
        );
      }
    },
    deleteTask(state, action) {
      //find the column the task to be deleted is
      const updatedColumn = state.boardData.columns.find(
        (column) => column.name === action.payload.status
      );

      //remove the task from the column
      updatedColumn.tasks = updatedColumn.tasks.filter(
        (task) => task.id !== state.currentTask.id
      );

      //set the current task to an empty object
      state.currentTask = {};

      //update the board
      state.boardData.columns = state.boardData.columns.map((column) =>
        column.name === updatedColumn.name ? updatedColumn : column
      );
    },
  },
});

export const boardActions = boardSlice.actions;
