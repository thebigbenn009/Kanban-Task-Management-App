import React from "react";
import { useGlobalContext } from "../../context";
import DeleteModal from "../modal/DeleteModal";

const DropdownMenu = ({ openMenuDropdown }) => {
  const { closeViewTaskModal, openDeleteModal, openDropdown, setOpenDropdown } =
    useGlobalContext();
  const onDelete = () => {
    closeViewTaskModal();
    openDeleteModal();
  };
  return (
    <div
      className={`dropdown-menu ${
        openMenuDropdown === true && "dropdown-menu-active"
      }`}
    >
      <div className="task-options">
        <p className="edit-task">Edit Task</p>
        <p onClick={() => onDelete()} className="delete-task">
          Delete Task
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
