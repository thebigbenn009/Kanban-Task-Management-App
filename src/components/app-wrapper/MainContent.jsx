import React from "react";
import Navbar from "./Navbar";
import BoardContainer from "../board-components/BoardContainer";

const MainContent = () => {
  return (
    <section className="main-section">
      <Navbar />
      <BoardContainer />
    </section>
  );
};

export default MainContent;
