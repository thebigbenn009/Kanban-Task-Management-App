import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";
import { useFieldArray, useForm } from "react-hook-form";
import RemoveInput from "./RemoveInput";
import { boardActions } from "../../features/boardSlice/boardSlice";

const NewBoardModal = () => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "Tutorials",
      columns: [{ name: "Todo" }, { name: "Doing" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control,
  });
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.addNewBoardModal);
  const handleCloseModal = () => {
    dispatch(modalActions.closeNewBoardModal());
  };

  const onSubmit = (data) => {
    dispatch(boardActions.addNewBoard(data));
  };
  return (
    isModalOpen && (
      <ModalWrapper>
        <span className="close-modal" onClick={handleCloseModal}>
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </span>
        <div className="new-board">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Add New Board</h3>
            <div className="form-control">
              <label htmlFor="boardName">Board Name</label>
              <input type="text" {...register("name")} />
            </div>
            <label>Board Columns</label>
            {fields.map((field, index) => {
              return (
                <div className="add-column" key={field.id}>
                  <input type="text" {...register(`columns.${index}.name`)} />
                  <RemoveInput removeInput={remove} />
                </div>
              );
            })}

            <div className="form-btn-container">
              <button
                className="btn btn-block btn-white"
                type="button"
                onClick={() => append({ name: "" })}
              >
                <strong>+</strong> Add New Column
              </button>
              <button className="btn btn-primary btn-block" type="submit">
                create new board
              </button>
            </div>
          </form>
        </div>
      </ModalWrapper>
    )
  );
};

export default NewBoardModal;
