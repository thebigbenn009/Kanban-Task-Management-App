import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useGlobalContext } from "../../context";

const DeleteModal = ({ task }) => {
  const { deleteModal, deleteTask, taskToBeDisplayed, closeDeleteModal } =
    useGlobalContext();
  return (
    deleteModal && (
      <ModalWrapper modal={deleteModal}>
        <div className={`form-modal ${deleteModal ? "active" : ""}`}>
          <h3 className="delete-h3">Delete this task?</h3>
          <p className="delete-p">
            Are you sure you want to delete the <strong>{task}</strong> task and
            its subtasks? This action cannot be reversed.
          </p>
          <div className="btn-container">
            <button
              onClick={() => deleteTask(taskToBeDisplayed.title)}
              type="button"
              className="btn btn-delete"
            >
              Delete
            </button>
            <button
              onClick={closeDeleteModal}
              type="button"
              className="btn btn-cancel"
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
