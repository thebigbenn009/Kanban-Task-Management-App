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
  const { columns } = boardToBeDisplayed;
  return (
    <main>
      <TaskNav />
      {columns.length === 0 && <div>Empty colum here</div>}
      {columns.length >= 1 && <ColumnContainer />}
    </main>
  );
};

export default Task;
