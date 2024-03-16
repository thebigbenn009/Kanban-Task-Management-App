import React, { useState } from "react";

const Subtask = ({ title, id, isChecked, handleCheckboxChange }) => {
  return (
    <div
      onClick={handleCheckboxChange}
      className={`subtask ${
        isChecked === true ? "is-completed" : "not-completed"
      }`}
    >
      <input
        type="checkbox"
        className="custom-input custom-checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <p>{title}</p>
    </div>
  );
};

export default Subtask;
