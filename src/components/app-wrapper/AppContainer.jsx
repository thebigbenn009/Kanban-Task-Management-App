import React from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const AppContainer = () => {
  return (
    <section className="app-container">
      <Sidebar />
      <MainContent />
    </section>
  );
};

export default AppContainer;
