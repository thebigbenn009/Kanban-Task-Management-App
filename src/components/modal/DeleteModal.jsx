import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { taskMenuActions } from "../../features/task-menu/taskMenuSlice";
import { boardActions } from "../../features/boardSlice/boardSlice";

const DeleteModal = ({
  itemToBeDeleted,
  deleteTaskHandler,
  opener,
  sub,
  taskOrBoard,
  singularOrPlural,
}) => {
  const dispatch = useDispatch();
  const currentTask = useSelector((state) => state.board.currentTask);
  const isDeleteTaskOpen = useSelector(
    (state) => state.taskMenu.isDeleteTaskOpen
  );
  const cancelDeleteHandler = () => {
    dispatch(taskMenuActions.closeDeleteTask());
  };

  return (
    opener && (
      <ModalWrapper>
        <div className="delete-modal">
          <h3 className="delete-h3">Delete this {taskOrBoard}?</h3>
          <p>
            Are you sure you want to delete the {itemToBeDeleted} and its {sub}
            {singularOrPlural}? This action cannot be reversed.
          </p>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteTaskHandler}
            >
              Delete
            </button>
            <button
              onClick={cancelDeleteHandler}
              type="button"
              className="btn btn-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </ModalWrapper>
    )
  );
};

export default DeleteModal;
