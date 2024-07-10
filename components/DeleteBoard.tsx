"use client";
import { closeModal } from "@/app/features/modalSlice";
import { RootState } from "@/app/store";
import { deleteBoard } from "@/utils/actions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteBoard = ({ boardId }: { boardId: string }) => {
  const activeBoardId = useSelector(
    (state: RootState) => state.modal.activeBoardId
  );
  const dispatch = useDispatch();
  const handleDeleteBoard = async () => {
    await deleteBoard(boardId);
    dispatch(closeModal());
  };
  return (
    <div className="delete-board">
      <h3>Delete this board?</h3>
      <p>
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="delete-btn-container">
        <button
          onClick={handleDeleteBoard}
          className="btn btn-block btn-danger"
        >
          Delete
        </button>
        <button className="btn btn-block btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteBoard;
