import React from "react";
type SingleColumnProps = {
  name: string;
  id: string;
  color: string;
  //   tasks: Array<string>;
  //   boardId: string;
};

const SingleColumn = ({ name, id, color }: SingleColumnProps) => {
  return (
    <div className="single-column">
      <div className="column-header">
        <span
          style={{ backgroundColor: color }}
          className="colored-circle"
        ></span>
        <p className="column-name">{name}</p>
      </div>
    </div>
  );
};

export default SingleColumn;
