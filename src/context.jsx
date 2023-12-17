import React, { createContext, useContext, useReducer, useState } from "react";
const AppContext = createContext();
import jsonData from "../src/data.json";
import { useForm, useFieldArray } from "react-hook-form";

const data = jsonData.boards;
console.log(data);
export const AppProvider = ({ children }) => {
  ///////TODO INITIAL STATE OBJECT//////////////
  const initialState = {
    boards: data,
    currentBoard: data[0],
    sidebar: false,
    switchMode: false,
    newBoardModal: false,
  };

  ////////////REACT HOOK FORM//////////
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      boardName: "Tutorials",
      newColumns: [{ name: "JavaScript" }, { name: "Dart" }],
      title: "Take Coffee break",
      description: `e.g. It’s always good to take a break. This 15 minute break will 
      recharge the batteries a little.`,
    },
  });

  const {
    fields: newColumnFields,
    append: appendNewColumn,
    remove: removeNewColumn,
  } = useFieldArray({
    control,
    name: "newColumns",
  });
  const {
    fields: subtaskFields,
    append: appendSubtask,
    remove: removeSubtask,
  } = useFieldArray({
    control,
    name: "subtasks",
  });
  ////////////////////////////USE REDUCER//////////////////
  // const [state, dispatch] = useReducer(reducer, initialState);

  ///////////////////GLOBAL STATE VARIABLES *///////////
  const [boards, setBoards] = useState(data);
  const [switchMode, setSwitchMode] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [newBoardModal, setNewBoardModal] = useState(false);
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const [boardToBeDisplayed, setBoardToBeDisplayed] = useState(boards[0]);
  const [activeBoard, setActiveBoard] = useState("Platform Launch");

  /////////SUBMITTING A FORM/////////////
  const addNewBoard = (data) => {
    console.log(data);
    const { newColumns, boardName } = data;
    //////ADDING NEW BOARD TO EXISTING BOARD///////////////
    const newBoard = {
      name: boardName,
      columns: newColumns,
    };
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    setNewBoardModal(false);
  };
  const addNewTask = (data) => {
    console.log(data);
  };
  ///////FUNCTIONS/////////////////////////
  const getBoardToBeDisplayed = (boardName) => {
    const boardInArray = boards.find((board) => board.name === boardName);
    setBoardToBeDisplayed(boardInArray);
    setActiveBoard(boardName);
  };
  //////OPEN AND CLOSE NEW BOARD MODAL//////////////
  const openNewBoardModal = () => {
    setNewBoardModal(true);
  };
  const closeNewBoardModal = () => {
    setNewBoardModal(false);
  };
  const openAddTaskModal = () => {
    setIsOpenAddTask(true);
  };
  const closeAddTaskModal = () => {
    setIsOpenAddTask(false);
  };
  return (
    <AppContext.Provider
      value={{
        boards,
        setBoards,
        switchMode,
        setSwitchMode,
        openSidebar,
        setOpenSidebar,
        getBoardToBeDisplayed,
        boardToBeDisplayed,
        setBoardToBeDisplayed,
        isOpenAddTask,
        setIsOpenAddTask,
        activeBoard,
        setActiveBoard,
        register,
        control,
        handleSubmit,
        formState,
        newBoardModal,
        setNewBoardModal,
        closeNewBoardModal,
        openNewBoardModal,
        openAddTaskModal,
        closeAddTaskModal,

        appendNewColumn,
        removeNewColumn,
        newColumnFields,
        appendSubtask,
        removeSubtask,
        subtaskFields,
        addNewBoard,
        addNewTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
