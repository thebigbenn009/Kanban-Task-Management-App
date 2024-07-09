import React from "react";
import SingleTask from "../new task/SingleTask";

type SubtaskProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  taskId: string;
};

export type TaskProps = {
  title: string;
  id: string;
  description: string | null;
  status: string;
  columnId: string;
  subtasks: SubtaskProps[];
};

type SingleColumnProps = {
  column: {
    name: string;
    id: string;
    tasks: TaskProps[];
  };
  color: string;
};

const SingleColumn: React.FC<SingleColumnProps> = ({ column, color }) => {
  return (
    <div className="single-column">
      <div className="column-header">
        <span
          style={{ backgroundColor: color }}
          className="colored-circle"
        ></span>
        <p className="column-name">{column.name}</p>
      </div>
      <div className="column-tasks">
        {column.tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default SingleColumn;
