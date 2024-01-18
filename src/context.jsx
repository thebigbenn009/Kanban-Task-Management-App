import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
import jsonFile from "../src/data.json";
import { useForm, useFieldArray } from "react-hook-form";
import { assignIds, boardForm, newTaskForm } from "./form registers/Registers";
import { toast } from "react-toastify";
import useLocalStorage from "use-local-storage";
import { nanoid } from "nanoid";
import { setBackgroundColor } from "./utils";

const jsonData = () => {
  assignIds(jsonFile);
  return JSON.stringify(jsonFile, null, 2);
};

const data = JSON.parse(jsonData()).boards;
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
    control: subtaskControl,
    handleSubmit: submitNewTask,
    reset: resetNewTask,
  } = useForm(newTaskForm);
  const {
    fields: subtaskFields,
    append: appendSubtask,
    remove: removeSubtask,
  } = useFieldArray({
    control: subtaskControl,
    name: "subtasks",
  });

  /////////NEW COLUMN FORM////////////////

  const {
    fields: newColumnFields,
    append: appendNewColumn,
    remove: removeNewColumn,
  } = useFieldArray({
    control,
    name: "newColumns",
  });

  ////////////////////////////USE REDUCER//////////////////
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [boards, setBoards] = useState(data);

  const setLocalStorage = (data, identifier) => {
    localStorage.setItem(identifier, JSON.stringify(data));
  };
  const defaultBoardToBeDisplayed = JSON.parse(
    localStorage.getItem("boardToBeDisplayed") || `${JSON.stringify(boards[0])}`
  );
  const defaultTaskToBeDisplayed = JSON.parse(
    localStorage.getItem("taskToBeDisplayed") || "{}"
  );
  ///////////////////GLOBAL STATE VARIABLES *///////////
  const [switchMode, setSwitchMode] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [newBoardModal, setNewBoardModal] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const [boardToBeDisplayed, setBoardToBeDisplayed] = useState(
    defaultBoardToBeDisplayed
  );
  const [taskToBeDisplayed, setTaskToBeDisplayed] = useState(
    defaultTaskToBeDisplayed
  );
  const [activeBoard, setActiveBoard] = useState("Platform Launch");
  const [deleteModal, setDeleteModal] = useState(false);
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  const openEditModal = () => {
    setIsOpenEditModal(true);
  };
  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

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
    // setLocalStorage(taskToBeDisplayed, "taskToBeDisplayed");

    // setLocalStorage(boardToBeDisplayed, "boardToBeDisplayed");
  };

  /////////SUBMITTING A FORM/////////////
  //////ADDING NEW BOARD TO EXISTING BOARDS///////////////
  const addNewBoard = (data) => {
    const { newColumns, boardName } = data;
    const newBoard = {
      name: boardName,
      columns: newColumns,
      id: nanoid(),
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
      id: nanoid(),
      subtasks: subtasks.map((subtask) => ({
        ...subtask,
        isCompleted: false,
      })),
    };
    const updatedColumns = boardToBeDisplayed.columns.map((column) => {
      if (column.name === status) {
        if (column.tasks) {
          return {
            ...column,
            tasks: [newTask, ...column.tasks],
          };
        } else {
          return {
            ...column,
            tasks: [newTask],
          };
        }
      } else {
        return column;
      }
    });
    const updatedBoardToBeDisplayed = {
      name: boardToBeDisplayed.name,
      columns: updatedColumns,
    };

    setBoardToBeDisplayed(updatedBoardToBeDisplayed);
    setLocalStorage(boardToBeDisplayed, "boardToBeDisplayed");
    setIsOpenAddTask(false);
    resetNewTask();
  };

  //////////////EDITING OR UPDATING A TASK-//////////////////

  const updateTask = (data) => {
    console.log(data);
    console.log(taskToBeDisplayed, { ...data, id: taskToBeDisplayed.id });
    // const updatedData = { ...data, id: taskToBeDisplayed.id };
    // setBoardToBeDisplayed((prevBoard) => {
    //   return {
    //     ...prevBoard,
    //     columns: prevBoard.columns.map((column) => {
    //       if (column.name === data.status) {
    //         console.log(`${column.name} is equal to ${data.status}`);
    //         return {
    //           ...column,
    //           tasks: column.tasks.map((task) => {
    //             if (task.id === updatedData.id) {
    //               return updatedData;
    //             } else return task;
    //           }),
    //         };
    //       } else
    //         return {
    //           ...column,
    //           tasks: column.tasks.filter((task) => task.id !== updatedData.id),
    //         };
    //     }),
    //   };
    // });

    const updatedBoard = {
      ...boardToBeDisplayed,
      columns: boardToBeDisplayed.columns.map((column) => {
        if (column.name === data.status) {
          return {
            ...column,
            tasks: column.tasks.map((task) => {
              if (task.id === data.id) {
                setTaskToBeDisplayed(data);

                return { ...data };
              } else return task;
            }),
          };
        } else {
          return column;
        }
      }),
    };
    setBoardToBeDisplayed(updatedBoard);
    // setLocalStorage(boardToBeDisplayed, "boardToBeDisplayed");
  };

  ///////FUNCTIONS/////////////////////////
  const getBoardToBeDisplayed = (boardName) => {
    const boardInArray = boards.find((board) => board.name === boardName);
    setBoardToBeDisplayed(boardInArray);
    setActiveBoard(boardName);
  };

  const displayTask = (id) => {
    setViewTaskModal(true);

    const userTask = boardToBeDisplayed.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === id);
    setTaskToBeDisplayed(userTask);
  };
  const deleteTask = (id) => {
    const newBoard = {
      ...boardToBeDisplayed,
      columns: boardToBeDisplayed.columns.map((column) => {
        const updatedColumn = {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== id),
        };
        return updatedColumn;
      }),
    };
    setBoardToBeDisplayed(newBoard);
    setDeleteModal(false);
    setOpenMenuDropdown(false);
    setTaskToBeDisplayed({});
  };

  const addItemToColumn = (id, name) => {
    const dragged = boardToBeDisplayed.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === id);

    console.log({ ...dragged, status: name }, name);
    setTaskToBeDisplayed({ ...dragged, status: name });
    const updatedBoard = {
      ...boardToBeDisplayed,
      columns: boardToBeDisplayed.columns.map((column) => {
        if (column.name === name) {
          return {
            ...column,
            tasks: [taskToBeDisplayed, ...column.tasks],
          };
        } else return column;
      }),
    };

    setBoardToBeDisplayed(updatedBoard);
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
    setOpenMenuDropdown(false);
  };
  return (
    <AppContext.Provider
      value={{
        setLocalStorage,
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
        resetNewTask,
        displayTask,
        taskToBeDisplayed,
        setTaskToBeDisplayed,
        openViewTaskModal,
        closeViewTaskModal,
        viewTaskModal,
        setViewTaskModal,
        updateSubtaskStatus,
        deleteModal,
        setDeleteModal,
        openDeleteModal,
        closeDeleteModal,
        deleteTask,
        openMenuDropdown,
        setOpenMenuDropdown,
        switchTheme,
        theme,
        openDropdown,

        setOpenDropdown,
        isOpenEditModal,
        setIsOpenEditModal,
        openEditModal,
        closeEditModal,
        updateTask,
        currentStatus,
        setCurrentStatus,
        addItemToColumn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
