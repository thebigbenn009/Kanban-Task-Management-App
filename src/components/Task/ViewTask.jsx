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
  } = useGlobalContext();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { title, description, status, subtasks } = taskToBeDisplayed;

  const [currentStatus, setCurrentStatus] = useState("");

  const onCurrentStatus = (title) => {
    setCurrentStatus(title);

    setTaskToBeDisplayed((prevTask) => {
      const updatedTask = { ...prevTask, status: currentStatus };
      return updatedTask;
    });
    setOpenDropdown(false);
    toast.success(`current status changed to ${title}`);
  };
  useEffect(() => {
    // Somehow, this managed to work.
    // I observed that the initial state of the destructured "title" gotten from the taskToBeDisplayed state is undefined.
    // AFter clicking on the task, the taskToBeDisplayed becomes a defined object, and so does the destructured title.
    // Setting the currentStatus to the destructured status happens only when the title changes, which makes sense, since the title did in fact, change from undefined to a defined value.
    //Now, when the onCurrent function is being called, setCurrentStatus would be updated to the name of the column whenever the user changes the status of the task.
    // the status property of the updatedTask is set to the currentStatus

    setCurrentStatus(status);
  }, [title]);
  useEffect(() => {
    const updatedBoard = {
      ...boardToBeDisplayed,
      columns: boardToBeDisplayed.columns.map((column) => {
        //we are returning updatedColumn for every column object mapped
        const updatedColumn = {
          ...column,
          tasks: column.tasks.filter((task) => task.title !== title),
        };
        //if the column name is the same as the currentStatus, push the updatedTask object to the that column
        if (column.name === currentStatus) {
          updatedColumn.tasks = [taskToBeDisplayed, ...updatedColumn.tasks];
          //   updatedColumn.tasks.splice(originalIndex, 0, taskToBeDisplayed);
        }
        return updatedColumn;
      }),
    };
    setBoardToBeDisplayed(updatedBoard);
  }, [title, currentStatus, taskToBeDisplayed]);

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
