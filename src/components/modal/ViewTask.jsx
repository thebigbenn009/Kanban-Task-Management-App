import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";
import Subtask from "./Subtask";
import { boardActions } from "../../features/boardSlice/boardSlice";
const ViewTask = () => {
  const dispatch = useDispatch();
  const viewTaskModal = useSelector((state) => state.modal.viewTaskModal);
  const boardData = useSelector((state) => state.board.boardData);
  const handleCloseModal = () => {
    dispatch(modalActions.closeViewTaskModal());
  };
  const currentTask = useSelector((state) => state.board.currentTask);
  const { title, description, id, subtasks, status } = currentTask;
  const numCompleted = subtasks?.filter(
    (subtask) => subtask.isCompleted !== false
  ).length;
  const totalSubtasks = subtasks?.length;
  //   const handleCheckboxChange = () => {
  //     dispatch(boardActions.updateCheckboxChange(id));
  //   };
  return (
    viewTaskModal && (
      <ModalWrapper>
        <div className="view-task-container">
          <span className="close-modal" onClick={handleCloseModal}>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </span>
          <div className="task-header">
            <h3>{title}</h3>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </div>
          <p>{description}</p>
          <h4>
            subtasks ({numCompleted} of {totalSubtasks})
          </h4>
          <div>
            {subtasks.map((subtask) => {
              return (
                <Subtask
                  key={subtask.id}
                  isChecked={subtask.isCompleted}
                  handleCheckboxChange={() =>
                    dispatch(boardActions.updateCheckboxChange(subtask.id))
                  }
                  title={subtask.title}
                  id={subtask.id}
                />
              );
            })}
          </div>
          <p className="current-status">current status</p>
          <select
            value={currentTask.status}
            onChange={(e) =>
              dispatch(boardActions.updateTaskStatus(e.target.value))
            }
          >
            {boardData.columns.map((column) => {
              return (
                <option value={column.name} key={column.name}>
                  {column.name}
                </option>
              );
            })}
          </select>
        </div>
      </ModalWrapper>
    )
  );
};

export default ViewTask;
