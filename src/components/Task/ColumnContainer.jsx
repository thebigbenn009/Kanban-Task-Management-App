import React from "react";
import Column from "./Column";
import { useGlobalContext } from "../../context";

const ColumnContainer = () => {
  const { boardToBeDisplayed, boards } = useGlobalContext();
  const { columns } = boardToBeDisplayed;

  return (
    <section className="columns">
      {columns.map((column) => {
        const { name, tasks } = column;
        return <Column name={name} tasks={tasks} />;
      })}
    </section>
  );
};

export default ColumnContainer;
