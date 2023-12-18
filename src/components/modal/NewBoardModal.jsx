import React from "react";
import { useGlobalContext } from "../../context";
import CloseModal from "./CloseModal";
import RemoveInput from "../Task/RemoveInput";

const NewBoardModal = () => {
  const {
    newBoardModal,
    closeNewBoardModal,
    register,
    newColumnFields,
    appendNewColumn,
    removeNewColumn,
    addNewBoard,
    handleSubmit,
  } = useGlobalContext();

  return (
    newBoardModal && (
      <div className={`overlay ${newBoardModal ? "active" : ""}`}>
        <CloseModal modalToCLose={closeNewBoardModal} />
        <form
          onSubmit={handleSubmit(addNewBoard)}
          className={`form-modal ${newBoardModal ? "active" : ""}`}
        >
          <h3>Add New Board</h3>
          <div className="form-control mb-2">
            <label htmlFor="boardName">Board Name</label>
            <input type="text" {...register("boardName")} />
          </div>
          <label>Board Columns</label>
          {newColumnFields.map((field, index) => {
            return (
              <div className="add-column" key={field.id}>
                <input {...register(`newColumns.${index}.name`)} />
                <RemoveInput remove={removeNewColumn} index={index} />
              </div>
            );
          })}
          <div className="form-btn-container">
            <button
              className="btn btn-block btn-white"
              type="button"
              onClick={() => appendNewColumn({ name: "" })}
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
