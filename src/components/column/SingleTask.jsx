import React from "react";

const SingleTask = ({ title, subtasks }) => {
  const totalSubtasks = subtasks.map((subtask) => subtask.id).length;
  const numCompletedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted !== false
  ).length;
  return (
    <article className="single-task">
      <h4>{title}</h4>
      <p className="article-text">
        {numCompletedSubtasks} of {totalSubtasks} subtasks
      </p>
    </article>
  );
};

export default SingleTask;
