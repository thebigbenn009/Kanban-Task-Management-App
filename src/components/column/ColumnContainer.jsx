import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleColumn from "./SingleColumn";

const ColumnContainer = () => {
  const boardData = useSelector((state) => state.board.boardData);
  const changeScroll = () => {
    console.log(window.scrollY);
  };
  window.addEventListener("scroll", changeScroll);

  return (
    <section className="column-container">
      {boardData?.columns?.map((column) => {
        return (
          <SingleColumn
            column={column}
            key={column.id}
            taskLength={column?.tasks?.length}
          />
        );
      })}
      <div>Add New Column</div>
    </section>
  );
};

export default ColumnContainer;
