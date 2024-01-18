import React, { useState } from "react";
import ColumnCard from "./ColumnCard";
import { useGlobalContext } from "../../context";
import { setBackgroundColor } from "../../utils";
import EmptyColumn from "./EmptyColumn";
import ColumnTitle from "./ColumnTitle";
import NewTaskModal from "../modal/NewTaskModal";
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";

const Column = ({ tasks, name }) => {
  const {
    boardToBeDisplayed,

    setBoardToBeDisplayed,
  } = useGlobalContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: ({ id, initColumn }) => addItemToColumn(id, name, initColumn),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToColumn = (id, name, initColumn) => {
    console.log(`${id} moved from ${initColumn} to ${name}`);
    const isDragged = boardToBeDisplayed.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === id);

    setBoardToBeDisplayed((prevBoard) => {
      return {
        ...prevBoard,
        columns: prevBoard.columns.map((column) => {
          if (column.name === initColumn) {
            return {
              ...column,
              tasks: column.tasks.map((task) => {
                if (task.id === id) {
                  return { ...task, status: name };
                } else return task;
              }),
            };
          }
          if (column.name === name) {
            return {
              ...column,
              tasks: [{ ...isDragged, status: name }, ...column.tasks],
            };
          }

          return column;
        }),
      };
    });
  };

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
                  initColumn={name}
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
