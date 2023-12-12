import React from "react";
import Boards from "../sidebar/Boards";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="brand">
        <span>
          <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
            <g fill="#635FC7" fill-rule="evenodd">
              <rect width="6" height="25" rx="2" />
              <rect opacity=".75" x="9" width="6" height="25" rx="2" />
              <rect opacity=".5" x="18" width="6" height="25" rx="2" />
            </g>
          </svg>
        </span>
        <h2>Kanban</h2>
      </div>
      <div className="side-details">
        <Boards />
      </div>
      <div className="side-footer"></div>
    </div>
  );
};

export default Sidebar;
