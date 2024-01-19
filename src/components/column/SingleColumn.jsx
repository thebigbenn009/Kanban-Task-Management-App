import React from "react";
import SingleTask from "./SingleTask";

const SingleColumn = ({ column, taskLength }) => {
  return (
    <div className="single-column">
      <p className="status">
        {column.name} ({taskLength})
      </p>

      <div className="column-parent">
        {column.tasks
          .filter((task) => task.title !== column.name)
          .map((task) => {
            return (
              <SingleTask
                key={task.id}
                title={task.title}
                subtasks={task.subtasks}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SingleColumn;
