import React from "react";
import ColumnCard from "./ColumnCard";
import { useGlobalContext } from "../../context";
import { setBackgroundColor } from "../../utils";
import EmptyColumn from "./EmptyColumn";
import ColumnTitle from "./ColumnTitle";
import NewTaskModal from "../modal/NewTaskModal";
import { useEffect } from "react";
import { useDrop } from "react-dnd";

const Column = ({ tasks, name }) => {
  const { addItemToColumn } = useGlobalContext();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: ({ id }) => addItemToColumn(id, name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // const addItemToColumn = (id) => {
  //   console.log("dropped", id, name);
  // };
  return (
    <>
      <div className="column" ref={drop}>
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
                  id={task.id}
                  key={task.id}
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
