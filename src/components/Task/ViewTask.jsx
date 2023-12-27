import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import ModalWrapper from "../modal/ModalWrapper";
import CloseModal from "../modal/CloseModal";
import Subtask from "./Subtask";
import NumCompletedSubtasks from "./NumCompletedSubtasks";
import TaskStatus from "./TaskStatus";

const ViewTask = () => {
  const {
    viewTaskModal,
    closeViewTaskModal,
    taskToBeDisplayed,
    setTaskToBeDisplayed,
    boardToBeDisplayed,
    setBoardToBeDisplayed,
  } = useGlobalContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { title, description, status, subtasks } = taskToBeDisplayed;

  const [currentStatus, setCurrentStatus] = useState(status);
  //   console.log(taskToBeDisplayed);
  const onCurrentStatus = (title) => {
    setCurrentStatus(title);
    setTaskToBeDisplayed((prevTask) => {
      const updatedTask = { ...prevTask, status: title };
      return updatedTask;
    });
  };
  //   useEffect(() => {
  //     const updatedBoard = {
  //       ...boardToBeDisplayed,
  //       columns: boardToBeDisplayed.columns.map((column) => ({
  //         ...column,
  //         tasks: column.tasks.map((task) => {
  //           if (task.title === title) {
  //             return taskToBeDisplayed;
  //           } else return task;
  //         }),
  //       })),
  //     };

  //     setBoardToBeDisplayed(updatedBoard);
  //   }, [title, taskToBeDisplayed]);
  useEffect(() => {
    const updatedBoard = {
      ...boardToBeDisplayed,
      columns: boardToBeDisplayed.columns.map((column) => {
        const updatedColumn = {
          ...column,
          tasks: column.tasks.filter((task) => task.title !== title),
        };
        if (column.name === currentStatus) {
          updatedColumn.tasks.push(taskToBeDisplayed);
        }
        return updatedColumn;
      }),
    };
    setBoardToBeDisplayed(updatedBoard);
  }, [title, currentStatus, taskToBeDisplayed, boardToBeDisplayed]);

  return (
    viewTaskModal && (
      <ModalWrapper modal={viewTaskModal}>
        <CloseModal modalToCLose={closeViewTaskModal} />
        <form className={`form-modal ${viewTaskModal ? "active" : ""}`}>
          <div className="title-header">
            <h3>{title}</h3>
            <span className="menu-bar">
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fill-rule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>
            </span>
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
                      onCurrentStatus={() => onCurrentStatus(column.name)}
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
