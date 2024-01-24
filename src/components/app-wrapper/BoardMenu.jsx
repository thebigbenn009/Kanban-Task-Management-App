import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardMenuActions } from "../../features/boardMenu/boardMenuSlice";

const BoardMenu = () => {
  const dispatch = useDispatch();
  const isBoardMenuOpen = useSelector(
    (state) => state.boardMenu.isBoardMenuOpen
  );
  const openEditBoardHandler = () => {
    dispatch(boardMenuActions.openEditBoardModal());
    dispatch(boardMenuActions.closeEditBoardMenu());
  };
  const openDeleteBoardHandler = () => {
    dispatch(boardMenuActions.closeEditBoardMenu());
    dispatch(boardMenuActions.openDeleteBoardModal());
  };
  return (
    <div className={`board-menu ${isBoardMenuOpen && "board-menu-visible"}`}>
      <p onClick={openEditBoardHandler} className="edit-task">
        edit board
      </p>
      <p onClick={openDeleteBoardHandler} className="delete-task">
        delete board
      </p>
    </div>
  );
};

export default BoardMenu;
