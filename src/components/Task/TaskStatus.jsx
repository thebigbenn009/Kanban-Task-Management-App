import React from "react";

const TaskStatus = ({ status, onCurrentStatus }) => {
  return (
    <li onClick={() => onCurrentStatus(status)}>
      <span>{status}</span>
    </li>
  );
};

export default TaskStatus;
