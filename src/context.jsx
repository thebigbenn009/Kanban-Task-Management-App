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
    },
  });
  const { isSubmitSuccessful } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "newColumns",
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
  const onSubmit = (data) => {
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
        fields,
        append,
        remove,
        onSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
