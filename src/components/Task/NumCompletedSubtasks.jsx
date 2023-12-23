import React from "react";

const NumCompletedSubtasks = ({ subtasks }) => {
  const length = subtasks.filter((subtask) => subtask.isCompleted).length;
  const total = subtasks.length;
  return (
    <p style={{ marginBottom: "1.6rem" }}>
      Subtasks ({length} of {total} )
    </p>
  );
};

export default NumCompletedSubtasks;
