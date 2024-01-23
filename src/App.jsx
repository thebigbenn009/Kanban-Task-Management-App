import React from "react";
import AppContainer from "./components/app-wrapper/AppContainer";
import NewBoardModal from "./components/modal/NewBoardModal";
import AddNewTask from "./components/modal/AddNewTask";
import ViewTask from "./components/modal/ViewTask";
import EditTaskModal from "./components/modal/EditTaskModal";
import DeleteModal from "./components/modal/DeleteModal";
import EditBoardModal from "./components/modal/EditBoardModal";

const App = () => {
  return (
    <>
      <AppContainer />
      <NewBoardModal />
      <AddNewTask />
      <ViewTask />
      <EditTaskModal />
      <DeleteModal />
      <EditBoardModal />
    </>
  );
};

export default App;
