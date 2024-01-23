import React from "react";
import AppContainer from "./components/app-wrapper/AppContainer";
import NewBoardModal from "./components/modal/NewBoardModal";
import AddNewTask from "./components/modal/AddNewTask";
import ViewTask from "./components/modal/ViewTask";
import EditTaskModal from "./components/modal/EditTaskModal";
import DeleteModal from "./components/modal/DeleteModal";
import EditBoardModal from "./components/modal/EditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "./features/boardSlice/boardSlice";
import { taskMenuActions } from "./features/task-menu/taskMenuSlice";

const App = () => {
  const currentTask = useSelector((state) => state.board.currentTask);
  const isDeleteTaskOpen = useSelector(
    (state) => state.taskMenu.isDeleteTaskOpen
  );
  const deleteBoardModal = useSelector(
    (state) => state.boardMenu.deleteBoardModal
  );
  const dispatch = useDispatch();
  const deleteTaskHandler = () => {
    dispatch(taskMenuActions.closeDeleteTask());
    dispatch(boardActions.deleteTask(currentTask));
  };
  return (
    <>
      <AppContainer />
      <NewBoardModal />
      <AddNewTask />
      <ViewTask />
      <EditTaskModal />
      <DeleteModal
        itemToBeDeleted={currentTask.title}
        deleteTaskHandler={deleteTaskHandler}
        opener={isDeleteTaskOpen}
      />
      <DeleteModal opener={deleteBoardModal} />
      <EditBoardModal />
    </>
  );
};

export default App;
