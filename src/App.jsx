import React from "react";
import AppContainer from "./components/app-wrapper/AppContainer";
import NewBoardModal from "./components/modal/NewBoardModal";
import AddNewTask from "./components/modal/AddNewTask";

const App = () => {
  return (
    <>
      <AppContainer />
      <NewBoardModal />
      <AddNewTask />
    </>
  );
};

export default App;
