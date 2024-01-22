import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";
import { useFieldArray, useForm } from "react-hook-form";
import RemoveInput from "./RemoveInput";
import { nanoid } from "nanoid";
import { boardActions } from "../../features/boardSlice/boardSlice";

const AddNewTask = () => {
  const [columnName, setColumnName] = useState("");
  const dispatch = useDispatch();
  const addNewTaskModal = useSelector((state) => state.modal.addNewTaskModal);
  const boardData = useSelector((state) => state.board.boardData);
  const handleCloseModal = () => {
    dispatch(modalActions.closeNewTaskModal());
  };
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "Take Coffee break",
      description: `e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.`,
      subtasks: [
        {
          title: "Interview 10 customers",
          isCompleted: false,
        },
        {
          title: "Review common customer pain points and suggestions",
          isCompleted: false,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });
  const onSubmit = (data) => {
    const dataToBeSubmitted = {
      id: nanoid(),
      ...data,
      subtasks: data.subtasks.map((subtask) => {
        return {
          id: nanoid(),
          isCompleted: false,
          ...subtask,
        };
      }),
    };
    console.log(dataToBeSubmitted);
    dispatch(boardActions.addNewTask(dataToBeSubmitted));
  };
  return (
    addNewTaskModal && (
      <ModalWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="close-modal" onClick={handleCloseModal}>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </span>
          <h3>add new task</h3>
          <div className="form-control">
            <label htmlFor="title">title</label>
            <input type="text" {...register("title")} />
          </div>
          <div className="form-control">
            <label htmlFor="description">description</label>
            <textarea
              cols="30"
              rows="5"
              {...register("description")}
            ></textarea>
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
              onClick={() => append({ title: "" })}
            >
              <strong>+</strong> Add New subtask
            </button>
          </div>

          <div className="form-control">
            <label htmlFor="">status</label>
            <select
              {...register("status")}
              onChange={(e) => setColumnName(e.target.value)}
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
          <button className="btn btn-primary btn-block" type="submit">
            add new task
          </button>
        </form>
      </ModalWrapper>
    )
  );
};

export default AddNewTask;
