import React from "react";
import { useDispatch } from "react-redux";
import { boardActions } from "../../features/boardSlice/boardSlice";
import { modalActions } from "../../features/modal/modalSlice";

const SingleTask = ({ title, subtasks, id, handleOpenTask }) => {
  const dispatch = useDispatch();
  const totalSubtasks = subtasks.map((subtask) => subtask.id).length;
  const numCompletedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted !== false
  ).length;
  //   const handleOpenTask = () => {
  //     // dispatch(modalActions.openViewTaskModal());
  //     // dispatch(boardActions.displayTask(id));
  //   };
  return (
    <article className="single-task" onClick={handleOpenTask}>
      <h4>{title}</h4>
      <p className="article-text">
        {numCompletedSubtasks} of {totalSubtasks} subtasks
      </p>
    </article>
  );
};

export default SingleTask;
