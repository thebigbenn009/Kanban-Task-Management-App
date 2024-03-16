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
import { boardMenuActions } from "./features/boardMenu/boardMenuSlice";

const App = () => {
  const currentTask = useSelector((state) => state.board.currentTask);
  const boardData = useSelector((state) => state.board.boardData);

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
  const deleteBoardHandler = () => {
    dispatch(boardActions.deleteBoard(boardData.id));
    dispatch(boardMenuActions.closeDeleteBoardModal());
  };
  return (
    <>
      <AppContainer />
      <NewBoardModal />
      <AddNewTask />
      <ViewTask />
      <EditTaskModal />
      <DeleteModal
        sub="subtask"
        taskOrBoard="task"
        itemToBeDeleted={currentTask.title}
        deleteTaskHandler={deleteTaskHandler}
        opener={isDeleteTaskOpen}
        singularOrPlural={currentTask?.subtasks?.length > 1 && "s"}
      />
      <DeleteModal
        opener={deleteBoardModal}
        itemToBeDeleted={boardData.name}
        sub="column"
        taskOrBoard="board"
        deleteTaskHandler={deleteBoardHandler}
        singularOrPlural={boardData?.columns?.length > 1 && "s"}
      />
      <EditBoardModal />
    </>
  );
};

export default App;
