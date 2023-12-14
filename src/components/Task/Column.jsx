import React from "react";
import ColumnCard from "./ColumnCard";

const Column = ({ name, tasks }) => {
  return (
    <div className="column">
      <div className="column-title">
        <span></span>
        <h4>{name} (4)</h4>
      </div>
      <div className="column-rows">
        {tasks.map((task) => {
          <ColumnCard title={task.title} length={tasks.length} />;
        })}
      </div>
    </div>
  );
};

export default Column;
