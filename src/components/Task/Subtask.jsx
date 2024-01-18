import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";

const Subtask = ({ title, isCompleted, id }) => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    updateSubtaskStatus,
    taskToBeDisplayed,
    setLocalStorage,
    boardToBeDisplayed,
    setBoardToBeDisplayed,
  } = useGlobalContext();

  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    updateSubtaskStatus(title);
  };

  return (
    <div
      onClick={handleChecked}
      className={`subtask ${isCompleted && "checked"}`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        // onChange={handleChecked}
        className="checkbox"
      />
      <p className={isCompleted && "completed"}>{title}</p>
    </div>
  );
};

export default Subtask;
