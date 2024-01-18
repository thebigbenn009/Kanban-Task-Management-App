import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { useGlobalContext } from "../../context";
import ModalWrapper from "./ModalWrapper";
import CloseModal from "./CloseModal";
import RemoveInput from "../Task/RemoveInput";
const EditTaskModal = () => {
  const {
    boardToBeDisplayed,
    isOpenEditModal,
    closeEditModal,
    updateTask,
    taskToBeDisplayed,
    setCurrentStatus,
    setTaskToBeDisplayed,
    setBoardToBeDisplayed,
  } = useGlobalContext();
  const {
    register: registerEditTask,
    control: editTaskControl,
    handleSubmit: submitEditTask,

    reset: resetEditForm,
  } = useForm({
    defaultValues: {
      ...taskToBeDisplayed,
      subtasks: taskToBeDisplayed.subtasks || [],
    },
  });
  const {
    fields: editTaskFields,
    append: appendEditColumn,
    remove: removeEditColumn,
  } = useFieldArray({
    control: editTaskControl,
    name: "subtasks",
  });

  useEffect(() => {
    resetEditForm({
      ...taskToBeDisplayed,
      subtasks: taskToBeDisplayed.subtasks || [],
    });
  }, [taskToBeDisplayed]);
  const onCurrentStatus = (status) => {
    setCurrentStatus(status);
  };

  return (
    isOpenEditModal && (
      <ModalWrapper modal={isOpenEditModal}>
        <CloseModal modalToCLose={closeEditModal} />
        <form
          onSubmit={submitEditTask(updateTask)}
          className={`form-modal ${isOpenEditModal ? "active" : ""}`}
        >
          <h3>Edit Task</h3>
          <div className="form-control mb-2">
            <label htmlFor="title">Title</label>
            <input type="text" {...registerEditTask("title")} />
          </div>
          <div className="form-control mb-2">
            <label htmlFor="description">Description</label>
            <textarea rows={4} cols={55} {...registerEditTask("description")} />
          </div>
          <label htmlFor="subtasks">Subtasks</label>
          {editTaskFields.map((field, index) => {
            return (
              <div className="add-column" key={field.id}>
                <input {...registerEditTask(`subtasks.${index}.title`)} />
                <RemoveInput remove={removeEditColumn} index={index} />
              </div>
            );
          })}
          <div className="form-btn-container">
            <button
              className="btn btn-block btn-white"
              type="button"
              onClick={() =>
                appendEditColumn({ title: "", isCompleted: false })
              }
            >
              Add New Subtask
            </button>
          </div>
          <div className="form-control mb-2">
            <label htmlFor="status">status</label>
            <select
              {...registerEditTask("status")}
              id="status"
              onChange={(e) => onCurrentStatus(e.target.value)}
            >
              {boardToBeDisplayed?.columns?.map((column) => {
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
            Update Task
          </button>
        </form>
      </ModalWrapper>
    )
  );
};

export default EditTaskModal;
