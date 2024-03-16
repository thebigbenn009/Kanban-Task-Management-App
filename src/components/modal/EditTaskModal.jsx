import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { taskMenuActions } from "../../features/task-menu/taskMenuSlice";
import { useFieldArray, useForm } from "react-hook-form";
import RemoveInput from "./RemoveInput";
import { nanoid } from "nanoid";
import { boardActions } from "../../features/boardSlice/boardSlice";

const EditTaskModal = () => {
  const dispatch = useDispatch();
  const isEditTaskOpen = useSelector((state) => state.taskMenu.isEditTaskOpen);
  const boardData = useSelector((state) => state.board.boardData);
  const currentTask = useSelector((state) => state.board.currentTask);
  const subtasks = currentTask.subtasks;
  const title = currentTask.title;
  const status = currentTask.status;
  const description = currentTask.description;
  const [newStatus, setNewStatus] = useState("");
  const handleCloseModal = () => {
    dispatch(taskMenuActions.closeEditTask());
  };
  const { register, handleSubmit, control, formState, reset, setValue } =
    useForm({
      defaultValues: {
        subtasks,
        title,
        description,
      },
    });
  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });

  const onSubmit = (data) => {
    const dataToBeSubmitted = {
      id: currentTask.id,
      ...data,
      status: newStatus,
    };
    console.log(currentTask, dataToBeSubmitted);
    dispatch(taskMenuActions.closeEditTask());
    dispatch(boardActions.editTask(dataToBeSubmitted));
  };
  useEffect(() => {
    //This is to set the default values once the subtasks are available
    if (currentTask) {
      reset({
        subtasks,
        title,
        description,
      });
      setNewStatus(status);
    }
  }, [currentTask]);
  return (
    isEditTaskOpen && (
      <ModalWrapper>
        <span className="close-modal" onClick={handleCloseModal}>
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>edit task</h3>
          <div className="form-control">
            <label>title</label>
            <input type="text" {...register("title")} />
          </div>
          <div className="form-control">
            <label htmlFor=""></label>
            <div className="form-control">
              <label htmlFor="description">description</label>
              <textarea
                cols="30"
                rows="5"
                {...register("description")}
              ></textarea>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="">subtasks</label>
            {fields.map((field, index) => {
              return (
                <div className="add-column" key={field.id}>
                  <input type="text" {...register(`subtasks.${index}.title`)} />
                  <RemoveInput removeInput={() => remove(index)} />
                </div>
              );
            })}
            <button
              className="btn btn-block btn-white"
              type="button"
              onClick={() =>
                append({ title: "", isCompleted: false, id: nanoid() })
              }
            >
              <strong>+</strong> Add New subtask
            </button>
          </div>
          <div className="form-control">
            <label htmlFor="">status</label>
            <select
              onChange={(e) => setNewStatus(e.target.value)}
              value={newStatus}
            >
              {boardData.columns.map((column) => {
                return (
                  <option value={column.name} key={column.name}>
                    {column.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-block btn-primary">
            save changes
          </button>
        </form>
      </ModalWrapper>
    )
  );
};

export default EditTaskModal;
