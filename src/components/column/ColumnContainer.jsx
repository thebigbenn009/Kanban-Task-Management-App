import React from "react";
import { useSelector } from "react-redux";
import SingleColumn from "./SingleColumn";

const ColumnContainer = () => {
  const boardData = useSelector((state) => state.board.boardData);
  if (Object.keys(boardData) === 0) return;
  return (
    <section className="column-container">
      {boardData?.columns?.map((column) => {
        return (
          <SingleColumn
            column={column}
            key={column.id}
            taskLength={column.tasks.length}
          />
        );
      })}
    </section>
  );
};

export default ColumnContainer;
