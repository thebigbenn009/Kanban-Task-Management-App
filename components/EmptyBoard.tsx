"use client";

import Image from "next/image";
import React from "react";
import cross from "@/public/icon-add-task-mobile.svg";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { openBoard, openModal } from "@/app/features/modalSlice";

const EmptyBoard = () => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const handleOpenModal = () => {
    dispatch(openModal());
    dispatch(openBoard());
  };
  return (
    <div className="empty-board">
      <h1>Your board is empty!</h1>
      <p>Start creating your boards now!</p>
      <button onClick={handleOpenModal} className="btn btn-flat">
        <span>
          <Image src={cross} alt="cross" />
        </span>
        create board
      </button>
    </div>
  );
};

export default EmptyBoard;
