import React from "react";
import { useGlobalContext } from "../../context";

const ColumnCard = ({ title, length, numCompleted }) => {
  const { displayTask } = useGlobalContext();
  return (
    <article className="column-card" onClick={() => displayTask(title)}>
      <p>{title}</p>
      <small>
        {numCompleted} of {length} subtasks
      </small>
    </article>
  );
};

export default ColumnCard;
