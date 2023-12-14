import React from "react";
import Column from "./Column";
import { useGlobalContext } from "../../context";

const ColumnContainer = () => {
  const { boards } = useGlobalContext();
  return (
    <section className="columns">
      {boards
        .map((board) => board.columns)
        .map((column) => {
          const { name, tasks } = column;
          return <Column name={name} tasks={tasks} />;
        })}
      <Column />
    </section>
  );
};

export default ColumnContainer;
