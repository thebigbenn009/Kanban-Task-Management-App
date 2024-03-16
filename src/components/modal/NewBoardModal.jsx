import React, { useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";
import { useFieldArray, useForm } from "react-hook-form";
import RemoveInput from "./RemoveInput";
import { boardActions } from "../../features/boardSlice/boardSlice";
import { nanoid } from "nanoid";
import { boardMenuActions } from "../../features/boardMenu/boardMenuSlice";

const NewBoardModal = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
    const newBoardData = {
      name: data.name,
      id: nanoid(),
      columns: data.columns.map((column) => {
        return {
          name: column.name,
          tasks: [],
          id: nanoid(),
        };
      }),
    };

    dispatch(boardActions.addNewBoard(newBoardData));
    dispatch(modalActions.closeNewBoardModal());
  };
  useEffect(() => {
    reset();
  }, [isModalOpen]);
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
              <input
                className={errors?.name?.message && "border-error"}
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "cannot be empty!",
                  },
                })}
              />
              <p className="form-error">{errors?.name?.message}</p>
            </div>
            <label>Board Columns</label>
            <div className="form-control">
              {fields.map((field, index) => {
                return (
                  <div className="add-column" key={field.id}>
                    <input
                      className={
                        errors?.columns?.[index]?.name && "border-error"
                      }
                      type="text"
                      {...register(`columns.${index}.name`, {
                        required: {
                          value: true,
                          message: "cannot be empty",
                        },
                      })}
                    />
                    <RemoveInput removeInput={() => remove(index)} />
                    <p className="subtask-error">
                      {errors?.columns?.[index]?.name.message}
                    </p>
                  </div>
                );
              })}
            </div>

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
