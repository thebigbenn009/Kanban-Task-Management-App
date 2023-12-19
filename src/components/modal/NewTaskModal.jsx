import React from "react";
import { useGlobalContext } from "../../context";
import CloseModal from "./CloseModal";
import RemoveInput from "../Task/RemoveInput";

const NewTaskModal = () => {
  const {
    isOpenAddTask,
    closeAddTaskModal,
    registerNewTask,
    subtaskFields,
    appendSubtask,
    removeSubtask,
    submitNewTask,
    addNewTask,
    getValues,
    boardToBeDisplayed,
  } = useGlobalContext();

  return (
    isOpenAddTask && (
      <div className={`overlay ${isOpenAddTask ? "active" : ""}`}>
        <CloseModal modalToCLose={closeAddTaskModal} />
        <form
          onSubmit={submitNewTask(addNewTask)}
          className={`form-modal ${isOpenAddTask ? "active" : ""}`}
        >
          <h3>Add New Task</h3>
          <div className="form-control mb-2">
            <label htmlFor="title">Title</label>
            <input type="text" {...registerNewTask("title")} />
          </div>
          <div className="form-control mb-2">
            <label htmlFor="description">Description</label>
            <textarea rows={4} cols={55} {...registerNewTask("description")} />
          </div>
          <label htmlFor="subtasks">Subtasks</label>
          {subtaskFields.map((field, index) => {
            return (
              <div className="add-column" key={field.id}>
                <input {...registerNewTask(`subtasks.${index}.title`)} />
                <RemoveInput remove={removeSubtask} index={index} />
              </div>
            );
          })}
          <div className="form-btn-container">
            <button
              className="btn btn-block btn-white"
              type="button"
              onClick={() => appendSubtask({ title: "" })}
            >
              Add New Subtask
            </button>
          </div>
          <div className="form-control mb-2">
            <label htmlFor="status">status</label>
            <select {...registerNewTask("status")} id="status">
              {boardToBeDisplayed.columns.map((column) => {
                return (
                  <option key={column.name} value={column.name}>
                    {column.name}
                  </option>
                );
              })}

              {/* <option value="Doing">Doing</option>
              <option value="Done">Done</option> */}
            </select>
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            create Task
          </button>
        </form>
      </div>
    )
  );
};

export default NewTaskModal;
