import React from "react";
import ModalWrapper from "./ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../features/modal/modalSlice";

const NewBoardModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.addNewBoardModal);
  const handleCloseModal = () => {
    dispatch(modalActions.closeNewBoardModal());
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
          <h3>Add New Board</h3>
        </div>
      </ModalWrapper>
    )
  );
};

export default NewBoardModal;
