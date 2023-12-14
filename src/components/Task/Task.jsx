import React from "react";
import Brand from "../sidebar/Brand";
import { useGlobalContext } from "../../context";
import TaskNav from "./TaskNav";
import ColumnContainer from "./ColumnContainer";

const Task = () => {
  const {
    openSidebar,
    setOpenSidebar,
    boardToBeDisplayed,
    setBoardToBeDisplayed,
  } = useGlobalContext();
  return (
    <main>
      <TaskNav />
      <ColumnContainer />
    </main>
  );
};

export default Task;
