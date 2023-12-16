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
        if (name || tasks) {
          return <Column name={name} tasks={tasks} />;
        }
      })}
      {/* <div className="new-column">jeu</div> */}
    </section>
  );
};

export default ColumnContainer;
