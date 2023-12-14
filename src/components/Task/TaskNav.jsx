import React from "react";
import { useGlobalContext } from "../../context";

const TaskNav = () => {
  const { openSidebar, boardToBeDisplayed } = useGlobalContext();
  return (
    <div className={`task-nav ${!openSidebar ? "nav-1fr" : ""}`}>
      {openSidebar && (
        <div className="brand p-2 b-right">
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
      )}
      <div className="task-info p-2">
        <h2>{boardToBeDisplayed.name}</h2>
        <div className="btn-info">
          <button className="btn btn-primary">
            <span>
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FFF"
                  d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                />
              </svg>
            </span>
            add new task
          </button>
          <span>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskNav;
