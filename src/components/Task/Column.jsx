import React from "react";
import ColumnCard from "./ColumnCard";
import { useGlobalContext } from "../../context";

const Column = ({ name, tasks }) => {
  return (
    <div className="column">
      <div className="column-title">
        <span></span>
        <h4>
          {name}({tasks.length})
        </h4>
      </div>
      <div className="column-rows">
        {tasks.map((task) => {
          const { subtasks } = task;
          const numCompleted = subtasks.filter(
            (subtask) => subtask.isCompleted === true
          ).length;
          return (
            <ColumnCard
              title={task.title}
              length={subtasks.length}
              numCompleted={numCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
