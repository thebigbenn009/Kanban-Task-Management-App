import React from "react";
import AppContainer from "./components/app-wrapper/AppContainer";
import NewBoardModal from "./components/modal/NewBoardModal";
import AddNewTask from "./components/modal/AddNewTask";
import ViewTask from "./components/modal/ViewTask";

const App = () => {
  return (
    <>
      <AppContainer />
      <NewBoardModal />
      <AddNewTask />
      <ViewTask />
    </>
  );
};

export default App;
