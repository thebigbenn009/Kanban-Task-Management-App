"use client";
import React, { useEffect, useRef } from "react";
import AddNewTaskButton from "./new task/AddNewTaskButton";
import { UserButton } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";
import {
  closeBoardMenu,
  openBoardMenu,
  toggleBoardMenu,
} from "@/app/features/modalSlice";
import BoardMenu from "./BoardMenu";
type TaskHeaderProps = {
  name: string;
};

const TaskHeader = ({ name }: TaskHeaderProps) => {
  const dispatch = useDispatch();
  const isBoardMenuOpen = useSelector(
    (state: RootState) => state.modal.isBoardMenuOpen
  );

  const menuRef = useRef<HTMLSpanElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      boardRef.current &&
      menuRef.current &&
      !boardRef.current.contains(event.target as Node) &&
      !menuRef.current.contains(event.target as Node)
    ) {
      dispatch(closeBoardMenu());
    }
  };
  useEffect(() => {
    if (isBoardMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBoardMenuOpen]);
  const handleOpenBoardMenu = () => {
    dispatch(toggleBoardMenu());
  };
  return (
    <>
      {isBoardMenuOpen && <BoardMenu ref={boardRef} />}

      <div className="task-header">
        <h1 className="header-left">{name}</h1>
        <div className="header-left">
          <AddNewTaskButton />
          <span ref={menuRef} onClick={handleOpenBoardMenu} className="ellipse">
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
          <span className="user-icon">
            <UserButton />
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskHeader;
