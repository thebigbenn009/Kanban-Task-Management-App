import React from "react";
import { useGlobalContext } from "../../context";
import BoardName from "./BoardName";
import NewBoardModal from "../modal/NewBoardModal";

const Boards = () => {
  const { boards, setBoards, openNewBoardModal } = useGlobalContext();
  return (
    <>
      <div className="boards">
        <h4>all boards</h4>
        <div className="board-wrapper">
          {boards.map((board, id) => {
            return <BoardName key={id} boardName={board.name} />;
          })}
        </div>
        <div className="board-name new-board" onClick={openNewBoardModal}>
          <span>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                className="board-icon"
                d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                fill="#828FA3"
              />
            </svg>
          </span>
          <span>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                className="board-icon"
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
          </span>
          <p>create new board</p>
        </div>
      </div>

      <NewBoardModal />
    </>
  );
};

export default Boards;
