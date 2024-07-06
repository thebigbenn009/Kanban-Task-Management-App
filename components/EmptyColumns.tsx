import React from "react";

const EmptyColumns = () => {
  return (
    <div>
      <p>This board is empty. Create a new column to get started.</p>
      <button className="btn btn-prime">
        <span>+</span> Add new column
      </button>
    </div>
  );
};

export default EmptyColumns;
