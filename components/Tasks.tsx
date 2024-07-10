import React from "react";
import TaskHeader from "./TaskHeader";
import SingleColumn from "./single column/SingleColumn";

const Tasks = ({ board }) => {
  return (
    <section className="tasks">
      <TaskHeader name={board.name} />
      <div className="task-body">
        <div className="tasks-container">
          {board.columns.map((column, index) => {
            const colorIndex =
              index === 0
                ? "#49C4E5"
                : index === 1
                ? "#8471F2"
                : index === 2
                ? "#67E2AE"
                : "#333";
            return (
              <SingleColumn
                key={column.id}
                column={{
                  name: column.name,
                  id: column.id,
                  tasks: column.tasks,
                }}
                color={colorIndex}
              />
            );
          })}
        </div>
        <div className="new-column">
          <button className="new-column-button">+ New Column</button>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
