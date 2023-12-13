import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
import jsonData from "../src/data.json";
// const data = JSON.parse();
const data = jsonData.boards;
console.log(data);
export const AppProvider = ({ children }) => {
  const [boards, setBoards] = useState(data);
  const [switchMode, setSwitchMode] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [boardToBeDisplayed, setBoardToBeDisplayed] = useState({});
  const [activeBoard, setActiveBoard] = useState("Platform Launch");
  const getBoardToBeDisplayed = (boardName) => {
    const boardInArray = boards.find((board) => board.name === boardName);
    setBoardToBeDisplayed(boardInArray);
    setActiveBoard(boardName);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
