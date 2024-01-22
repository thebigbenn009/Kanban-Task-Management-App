import React from "react";
import SingleTask from "./SingleTask";
import { useDispatch } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";
import { boardActions } from "../../features/boardSlice/boardSlice";

const SingleColumn = ({ column, taskLength = 0 }) => {
  const dispatch = useDispatch();
  // const handleOpenTask = () => {
  //   dispatch(modalActions.openViewTaskModal());
  // };
  return (
    <div className="single-column">
      <p className="status">
        {column.name} ({taskLength})
      </p>

      <div className="column-parent">
        {column?.tasks?.map((task) => {
          return (
            <SingleTask
              handleOpenTask={() => {
                dispatch(modalActions.openViewTaskModal());
                dispatch(boardActions.displayTask({ column, task }));
              }}
              key={task.id}
              id={task.id}
              title={task.title}
              subtasks={task.subtasks}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SingleColumn;
