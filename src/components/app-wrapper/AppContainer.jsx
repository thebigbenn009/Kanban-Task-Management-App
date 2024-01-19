import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useSelector } from "react-redux";

const AppContainer = () => {
  const themeSwitch = useSelector((state) => state.theme.darkMode);
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <section
      data-theme={themeSwitch}
      className={`app-container ${isSidebarOpen ? "" : "close-sidebar"}`}
    >
      <Sidebar />
      <MainContent />
    </section>
  );
};

export default AppContainer;
