"use client";
import { openDeleteBoard, openModal } from "@/app/features/modalSlice";
import { RootState } from "@/app/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BoardMenu = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  const dispatch = useDispatch();
  const isBoardMenuOpen = useSelector(
    (state: RootState) => state.modal.isBoardMenuOpen
  );

  const handleOpenDeleteBoardModal = () => {
    dispatch(openModal());
    dispatch(openDeleteBoard());
  };

  return (
    <div
      ref={ref}
      className={`board-menu ${isBoardMenuOpen ? "board-menu-visible" : ""}`}
    >
      <p className="board-menu-edit">Edit Board</p>
      <p onClick={handleOpenDeleteBoardModal} className="board-menu-delete">
        Delete Board
      </p>
    </div>
  );
});

export default BoardMenu;
