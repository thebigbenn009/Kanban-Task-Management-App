import React from "react";
import ColumnCard from "./ColumnCard";
import { useGlobalContext } from "../../context";
import { setBackgroundColor } from "../../utils";
import EmptyColumn from "./EmptyColumn";
import ColumnTitle from "./ColumnTitle";
import NewTaskModal from "../modal/NewTaskModal";

const Column = ({ name, tasks }) => {
  return (
    <>
      <div className="column">
        <ColumnTitle name={name} tasks={tasks} />
        {/* IF TASKS HAS BEEN CREATED  */}
        {tasks && (
          <div className="column-rows">
            {tasks.map((task) => {
              const numCompleted =
                task.subtasks &&
                task.subtasks.filter((subtask) => subtask.isCompleted === true)
                  .length;
              return (
                <ColumnCard
                  title={task.title}
                  length={task.subtasks && task.subtasks.length}
                  numCompleted={numCompleted}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Column;
