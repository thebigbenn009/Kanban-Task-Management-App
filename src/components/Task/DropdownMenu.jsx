import React from "react";
import { useGlobalContext } from "../../context";
import DeleteModal from "../modal/DeleteModal";

const DropdownMenu = ({ openMenuDropdown }) => {
  const {
    closeViewTaskModal,
    openDeleteModal,
    openDropdown,
    setOpenDropdown,
    openEditModal,
  } = useGlobalContext();
  const onDelete = () => {
    closeViewTaskModal();
    openDeleteModal();
  };
  const onEdit = () => {
    closeViewTaskModal();
    openEditModal();
  };
  return (
    <div
      className={`dropdown-menu ${
        openMenuDropdown === true && "dropdown-menu-active"
      }`}
    >
      <div className="task-options">
        <p className="edit-task" onClick={() => onEdit()}>
          Edit Task
        </p>
        <p onClick={() => onDelete()} className="delete-task">
          Delete Task
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
