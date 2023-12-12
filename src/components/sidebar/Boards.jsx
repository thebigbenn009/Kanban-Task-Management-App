import React from "react";
import { useGlobalContext } from "../../context";
import BoardName from "./BoardName";

const Boards = () => {
  const { boards, setBoards } = useGlobalContext();
  return (
    <div className="boards">
      <h4>all boards</h4>
      <div className="board-wrapper">
        {boards.map((board, id) => {
          return <BoardName key={id} boardName={board.name} />;
        })}
      </div>
    </div>
  );
};

export default Boards;
