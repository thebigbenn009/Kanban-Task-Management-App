import React from "react";
import jsonData from "../../data.json";
import BoardName from "./BoardName";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";
import { sidebarActions } from "../../features/sidebarSlice/sidebarSlice";

const BoardNames = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.board.data);
  const openNewBoardModalHandler = () => {
    dispatch(sidebarActions.closeMobileMenu());
    dispatch(modalActions.openNewBoardModal());
  };
  const boardLength = data.boards.map((board) => board.name).length;

  return (
    <div className="all-boards">
      <p className="board-text">all boards ({boardLength})</p>
      <div className="boards-container">
        <ul>
          {data.boards.map((board) => {
            return <BoardName key={board.id} boardName={board.name} />;
          })}
          <li className="board-name" onClick={openNewBoardModalHandler}>
            <span>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="icon"
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="#828FA3"
                />
              </svg>
            </span>
            <p>
              <strong>+</strong> add new board
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BoardNames;
