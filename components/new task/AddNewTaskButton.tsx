"use client";
import React from "react";
import cross from "@/public/icon-add-task-mobile.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { openTask, openModal } from "@/app/features/modalSlice";
const AddNewTaskButton = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const handleOpenAddTaskModal = () => {
    dispatch(openModal());
    dispatch(openTask());
  };
  return (
    <button onClick={handleOpenAddTaskModal} className="btn btn-prime">
      <span>
        <Image src={cross} alt="cross" />
      </span>
      Add New Task
    </button>
  );
};

export default AddNewTaskButton;
