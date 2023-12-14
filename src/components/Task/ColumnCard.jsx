import React from "react";

const ColumnCard = ({ title, length, numCompleted }) => {
  return (
    <article className="column-card">
      <p>{title}</p>
      <small>
        {numCompleted} of {length} subtasks
      </small>
    </article>
  );
};

export default ColumnCard;
