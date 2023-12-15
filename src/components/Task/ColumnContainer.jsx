import React from "react";
import Column from "./Column";
import { useGlobalContext } from "../../context";

const ColumnContainer = () => {
  const { boardToBeDisplayed, boards } = useGlobalContext();
  const { columns } = boardToBeDisplayed;
  if (columns.length === 0) {
    return (
      <section className="columns">
        <h3>no column to be displayed</h3>
      </section>
    );
  }

  return (
    <section className="columns">
      {columns.map((column) => {
        const { name, tasks } = column;
        return <Column name={name} tasks={tasks} />;
      })}
      {/* <div className="new-column">jeu</div> */}
    </section>
  );
};

export default ColumnContainer;
