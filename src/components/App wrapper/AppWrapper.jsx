import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useGlobalContext } from "../../context";

const AppWrapper = () => {
  const { openSidebar, setOpenSidebar } = useGlobalContext();
  return (
    <div
      className={`${
        openSidebar === true ? "app-wrapper hidden" : "app-wrapper"
      }`}
    >
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default AppWrapper;
