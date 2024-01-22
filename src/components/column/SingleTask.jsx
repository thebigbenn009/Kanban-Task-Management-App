import React from "react";
import { useDispatch } from "react-redux";
import { boardActions } from "../../features/boardSlice/boardSlice";

import { useDrag } from "react-dnd";

const SingleTask = ({ title, subtasks, id, handleOpenTask }) => {
  const dispatch = useDispatch();
  const totalSubtasks = subtasks.map((subtask) => subtask.id).length;
  const numCompletedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted !== false
  ).length;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SINGLE-TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <article ref={drag} className="single-task" onClick={handleOpenTask}>
      <h4>{title}</h4>
      <p className="article-text">
        {numCompletedSubtasks} of {totalSubtasks} subtasks
      </p>
    </article>
  );
};

export default SingleTask;
