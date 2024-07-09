import React from "react";
import { TaskProps } from "../single column/SingleColumn";

interface SingleTaskProps {
  task: TaskProps;
}

const SingleTask: React.FC<SingleTaskProps> = ({ task }) => {
  const { title, subtasks } = task;
  const numTotal = subtasks.length;
  const numChecked = subtasks.filter((subtask) => subtask.isCompleted).length;

  return (
    <div className="single-task">
      <div className="single-task-details">
        <h4>{title}</h4>
        {numTotal > 0 && (
          <p>
            {numChecked} of {numTotal} subtasks
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleTask;
