import React from "react";
import { setBackgroundColor } from "../../utils";

const ColumnTitle = ({ name, tasks }) => {
  return (
    <div className="column-title">
      <span style={{ backgroundColor: `${setBackgroundColor(name)}` }}></span>
      <h4>
        {name}({tasks?.length || 0})
      </h4>
    </div>
  );
};

export default ColumnTitle;
