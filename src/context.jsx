import React, { createContext, useContext, useReducer, useState } from "react";
const AppContext = createContext();
import jsonData from "../src/data.json";
import { useForm, useFieldArray } from "react-hook-form";
import { boardForm, newTaskForm } from "./form registers/Registers";
import { toast } from "react-toastify";

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
  const { register, control, handleSubmit, formState, getValues } =
    useForm(boardForm);

  const {
    register: registerNewTask,
    formState: { errors },
    control: subtaskControl,
    handleSubmit: submitNewTask,
  } = useForm(newTaskForm);
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
    control: subtaskControl,
    name: "subtasks",
  });

  ////////////////////////////USE REDUCER//////////////////
  // const [state, dispatch] = useReducer(reducer, initialState);

  ///////////////////GLOBAL STATE VARIABLES *///////////
  const [boards, setBoards] = useState(data);
  const [switchMode, setSwitchMode] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [newBoardModal, setNewBoardModal] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const [boardToBeDisplayed, setBoardToBeDisplayed] = useState(boards[0]);
  const [taskToBeDisplayed, setTaskToBeDisplayed] = useState({});
  const [activeBoard, setActiveBoard] = useState("Platform Launch");

  const updateSubtaskStatus = (title) => {
    const updatedSubtasks = taskToBeDisplayed.subtasks.map((subtask) => {
      if (subtask.title === title) {
        if (subtask.isCompleted === false) {
          toast.success(`marked as completed!`);
        }

        return { ...subtask, isCompleted: !subtask.isCompleted };
      } else return subtask;
    });
    const newTaskToBeDisplayed = {
      ...taskToBeDisplayed,
      subtasks: updatedSubtasks,
    };

    setTaskToBeDisplayed(newTaskToBeDisplayed);
  };

  /////////SUBMITTING A FORM/////////////
  //////ADDING NEW BOARD TO EXISTING BOARDS///////////////
  const addNewBoard = (data) => {
    const { newColumns, boardName } = data;
    const newBoard = {
      name: boardName,
      columns: newColumns,
    };
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    setNewBoardModal(false);
  };
  //////ADDING NEW TASK TO EXISTING TASKS///////////////

  const addNewTask = (data) => {
    console.log(data);
    const { title, description, status, subtasks = [] } = data;
    const newTask = {
      title,
      description,
      status,
      subtasks: subtasks.map((subtask) => ({
        ...subtask,
        isCompleted: false,
      })),
    };
    const updatedColumns = boardToBeDisplayed.columns.map((column) => {
      if (column.name === status) {
        return { ...column, tasks: [newTask, ...column.tasks] };
      } else {
        return column;
      }
    });
    const updatedBoardToBeDisplayed = {
      name: boardToBeDisplayed.name,
      columns: updatedColumns,
    };

    setBoardToBeDisplayed(updatedBoardToBeDisplayed);
    setIsOpenAddTask(false);
  };
  ///////FUNCTIONS/////////////////////////
  const getBoardToBeDisplayed = (boardName) => {
    const boardInArray = boards.find((board) => board.name === boardName);
    setBoardToBeDisplayed(boardInArray);
    setActiveBoard(boardName);
  };

  const displayTask = (title) => {
    setViewTaskModal(true);

    const userTask = boardToBeDisplayed.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.title === title);
    setTaskToBeDisplayed(userTask);
  };

  // console.log(displayTask("Build UI for onboarding flow"));
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
  const openViewTaskModal = () => {
    setViewTaskModal(true);
  };
  const closeViewTaskModal = () => {
    setViewTaskModal(false);
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
        subtaskControl,
        handleSubmit,
        formState,
        newBoardModal,
        setNewBoardModal,
        closeNewBoardModal,
        openNewBoardModal,
        openAddTaskModal,
        closeAddTaskModal,
        getValues,
        appendNewColumn,
        removeNewColumn,
        newColumnFields,
        appendSubtask,
        removeSubtask,
        subtaskFields,
        addNewBoard,
        addNewTask,
        registerNewTask,
        submitNewTask,
        displayTask,
        taskToBeDisplayed,
        setTaskToBeDisplayed,
        openViewTaskModal,
        closeViewTaskModal,
        viewTaskModal,
        setViewTaskModal,
        updateSubtaskStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
