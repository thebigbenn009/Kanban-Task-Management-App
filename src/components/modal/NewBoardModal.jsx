import React from "react";
import { useGlobalContext } from "../../context";

const NewBoardModal = () => {
  const {
    newBoardModal,
    closeNewBoardModal,
    register,
    fields,
    append,
    remove,
    onSubmit,
    handleSubmit,
  } = useGlobalContext();
  return (
    newBoardModal && (
      <div className={`overlay ${newBoardModal ? "active" : ""}`}>
        <span className="close-modal" onClick={closeNewBoardModal}>
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fill-rule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`form-modal ${newBoardModal ? "active" : ""}`}
        >
          <h3>Add New Board</h3>
          <div className="form-control mb-2">
            <label htmlFor="boardName">Board Name</label>
            <input type="text" {...register("boardName")} />
          </div>
          <label>Board Columns</label>
          {fields.map((field, index) => {
            return (
              <div className="add-column" key={field.id}>
                <input {...register(`newColumns.${index}.name`)} />
                <button
                  className="remove"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#828FA3" fill-rule="evenodd">
                      <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                      <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                    </g>
                  </svg>
                </button>
              </div>
            );
          })}
          <div className="form-btn-container">
            <button
              className="btn btn-block btn-white"
              type="button"
              onClick={() => append({ name: "" })}
            >
              Add New Column
            </button>
            <button className="btn btn-primary btn-block" type="submit">
              create new board
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default NewBoardModal;
