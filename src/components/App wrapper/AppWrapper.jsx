import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const AppWrapper = () => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default AppWrapper;
