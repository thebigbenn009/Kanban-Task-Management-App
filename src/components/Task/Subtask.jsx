import React, { useState } from "react";
import { useGlobalContext } from "../../context";

const Subtask = ({ title, isCompleted }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { updateSubtaskStatus } = useGlobalContext();
  const handleChecked = (e) => {
    setIsChecked(e.target.checked);
    updateSubtaskStatus(title);
  };
  return (
    <div className={`subtask ${isCompleted && "checked"}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleChecked}
        className="checkbox"
      />
      <p
        style={{ textDecoration: `${!isCompleted ? "none" : "line-through"}` }}
      >
        {title}
      </p>
    </div>
  );
};

export default Subtask;
