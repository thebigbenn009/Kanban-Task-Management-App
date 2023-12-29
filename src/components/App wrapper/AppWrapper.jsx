import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useGlobalContext } from "../../context";
import useLocalStorage from "use-local-storage";

const AppWrapper = () => {
  const { openSidebar, setOpenSidebar, switchTheme, theme } =
    useGlobalContext();
  return (
    <div
      data-theme={theme}
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
