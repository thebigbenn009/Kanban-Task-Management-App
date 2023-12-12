import React, { createContext, useContext, useState } from "react";
const AppContext = createContext();
import jsonData from "../src/data.json";
// const data = JSON.parse();
const data = jsonData.boards;
console.log(data);
export const AppProvider = ({ children }) => {
  const [boards, setBoards] = useState(data);
  const [switchMode, setSwitchMode] = useState(false);
  return (
    <AppContext.Provider
      value={{ boards, setBoards, switchMode, setSwitchMode }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
