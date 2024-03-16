import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskMenuActions } from "../../features/task-menu/taskMenuSlice";
import { modalActions } from "../../features/modal/modalSlice";

const TaskMenu = () => {
  const dispatch = useDispatch();
  const isTaskMenuOpen = useSelector((state) => state.taskMenu.isTaskMenuOpen);
  const openEditTaskHandler = () => {
    dispatch(taskMenuActions.openEditTask());
    dispatch(taskMenuActions.closeTaskMenu());
    dispatch(modalActions.closeViewTaskModal());
  };
  const openDeleteTaskHandler = () => {
    dispatch(taskMenuActions.openDeleteTask());
    dispatch(taskMenuActions.closeTaskMenu());
    dispatch(modalActions.closeViewTaskModal());
  };
  return (
    <div className={`task-menu ${isTaskMenuOpen && "task-menu-visible"}`}>
      <p onClick={openEditTaskHandler} className="edit-task">
        edit task
      </p>
      <p onClick={openDeleteTaskHandler} className="delete-task">
        delete task
      </p>
    </div>
  );
};

export default TaskMenu;
