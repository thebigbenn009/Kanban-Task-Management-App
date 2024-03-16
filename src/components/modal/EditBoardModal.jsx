import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { useFieldArray, useForm } from "react-hook-form";
import { boardMenuActions } from "../../features/boardMenu/boardMenuSlice";
import { nanoid } from "nanoid";
import RemoveInput from "./RemoveInput";
import { boardActions } from "../../features/boardSlice/boardSlice";
import { taskMenuActions } from "../../features/task-menu/taskMenuSlice";

const EditBoardModal = () => {
  const dispatch = useDispatch();
  const editBoardModal = useSelector((state) => state.boardMenu.editBoardModal);
  const boardData = useSelector((state) => state.board.boardData);
  const name = boardData.name;
  const columns = boardData.columns;
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name,
      columns,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });
  const handleCloseModal = () => {
    dispatch(boardMenuActions.closeEditBoardModal());
  };
  const onSubmit = (data) => {
    const updatedBoardData = {
      ...data,
      id: boardData.id,
    };
    console.log(updatedBoardData);

    dispatch(boardActions.editBoard(updatedBoardData));
  };
  useEffect(() => {
    //once the boardData is available
    if (boardData) {
      reset({
        name,
        columns,
      });
    }
  }, [boardData]);
  return (
    editBoardModal && (
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
          <h3>edit board</h3>
          <div className="form-control">
            <label>title</label>
            <input type="text" {...register("name")} />
          </div>
          <div className="form-control">
            <label>board columns</label>
            {fields.map((field, index) => {
              return (
                <div className="add-column" key={field.id}>
                  <input type="text" {...register(`columns.${index}.name`)} />
                  <RemoveInput removeInput={() => remove(index)} />
                </div>
              );
            })}
            <button
              className="btn btn-block btn-white"
              type="button"
              onClick={() => append({ name: "", tasks: [], id: nanoid() })}
            >
              <strong>+</strong> Add New column
            </button>
          </div>
          <button type="submit" className="btn btn-block btn-primary">
            save changes
          </button>
        </form>
      </ModalWrapper>
    )
  );
};

export default EditBoardModal;
