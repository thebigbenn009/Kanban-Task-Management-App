import React from "react";
import jsonData from "../../data.json";
import BoardName from "./BoardName";

const BoardNames = () => {
  return (
    <div className="all-boards">
      <p className="board-text">all boards ()</p>
      <div className="boards-container">
        <ul>
          {jsonData.boards.map((board) => {
            return <BoardName boardName={board.name} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BoardNames;
