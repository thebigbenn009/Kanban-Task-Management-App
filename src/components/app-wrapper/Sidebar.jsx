import React from "react";
import BoardNames from "../sidebar/BoardNames";
import ThemeSwitch from "../sidebar/ThemeSwitch";
import ToggleSidebar from "../sidebar/ToggleSidebar";
import { useSelector } from "react-redux";
import LogoContainer from "../sidebar/LogoContainer";

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <aside className={`sidebar ${isSidebarOpen ? "" : "hide-sidebar"}`}>
      <LogoContainer />
      <BoardNames />
      <ThemeSwitch />
      <ToggleSidebar />
    </aside>
  );
};

export default Sidebar;
