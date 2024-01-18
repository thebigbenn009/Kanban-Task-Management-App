import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import ModalWrapper from "../modal/ModalWrapper";
import CloseModal from "../modal/CloseModal";
import Subtask from "./Subtask";
import NumCompletedSubtasks from "./NumCompletedSubtasks";
import TaskStatus from "./TaskStatus";
import { toast } from "react-toastify";
import DropdownMenu from "./DropdownMenu";
import DeleteModal from "../modal/DeleteModal";
import { nanoid } from "nanoid";

const ViewTask = () => {
  const {
    viewTaskModal,
    closeViewTaskModal,
    taskToBeDisplayed,
    setTaskToBeDisplayed,
    boardToBeDisplayed,
    setBoardToBeDisplayed,
    openMenuDropdown,
    setOpenMenuDropdown,
    openDropdown,
    setOpenDropdown,
    currentStatus,
    setCurrentStatus,
    setLocalStorage,
  } = useGlobalContext();

  const { title, description, status, subtasks, id } = taskToBeDisplayed;

  const onCurrentStatus = (title, id) => {
    const changedTask = boardToBeDisplayed.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === id);
    setCurrentStatus(title);

    // setTaskToBeDisplayed((prevTask) => {
    //   return {
    //     ...prevTask,
    //     status: title,
    //   };
    // });
    setOpenDropdown(false);
    // toast.success(`current status changed to ${title}`);

    setBoardToBeDisplayed((prevBoard) => {
      return {
        ...prevBoard,
        columns: prevBoard.columns.map((column) => {
          if (column.name === status) {
            return {
              ...column,
              tasks: column.tasks.map((task) => {
                if (task.id === id) {
                  return { ...task, status: title };
                } else return task;
              }),
            };
          }
          if (column.name === title) {
            return {
              ...column,
              tasks: [{ ...changedTask, status: title }, ...column.tasks],
            };
          } else return column;
        }),
      };
    });
    // console.log(`status changed from ${status} to ${title}`);
  };

  return (
    viewTaskModal && (
      <ModalWrapper modal={viewTaskModal}>
        <CloseModal modalToCLose={closeViewTaskModal} />
        <form className={`form-modal ${viewTaskModal ? "active" : ""}`}>
          <div className="title-header">
            <div className="title-h3">
              <h3>{title}</h3>
            </div>

            <span
              className="menu-bar"
              onClick={() => setOpenMenuDropdown(!openMenuDropdown)}
            >
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fill-rule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>
            </span>
            <DropdownMenu openMenuDropdown={openMenuDropdown} />
          </div>
          <p className="description">{description}</p>
          <div className="subtasks">
            <NumCompletedSubtasks subtasks={subtasks} />
            {subtasks.map((subtask) => {
              return (
                <Subtask
                  key={subtask.title}
                  title={subtask.title}
                  isCompleted={subtask.isCompleted}
                />
              );
            })}
          </div>
          <div className="task-status">
            <p>Current status</p>
            <div className="dropdown">
              <div
                className="dropdown-value"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                {status}
              </div>
              <ul className={`ul ${openDropdown && "ul-active"}`}>
                {boardToBeDisplayed.columns.map((column) => {
                  return (
                    <TaskStatus
                      key={column.name}
                      status={column.name}
                      onCurrentStatus={() => onCurrentStatus(column.name, id)}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </form>
      </ModalWrapper>
    )
  );
};

export default ViewTask;
