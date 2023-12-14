import React from "react";

const ColumnCard = ({ title, length }) => {
  return (
    <article className="column-card">
      <p>{title}</p>
      <small>0 of {length} stubstasks</small>
    </article>
  );
};

export default ColumnCard;
