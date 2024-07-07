"use client";
import Modal from "@/components/Modal";
import React from "react";
import { useSelector } from "react-redux";
import NewBoard from "@/components/new board/NewBoard";
import { RootState } from "@/app/store";
import NewTask from "./new board/NewTask";

interface ModalBoardProps {
  newTaskId: string;
  columnNames: string[];
}

const ModalBoard: React.FC<ModalBoardProps> = ({ newTaskId, columnNames }) => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const isBoardOpen = useSelector(
    (state: RootState) => state.modal.isBoardOpen
  );
  const isTaskOpen = useSelector((state: RootState) => state.modal.isTaskOpen);

  return (
    <>
      {modalOpen && <Modal>{isBoardOpen && <NewBoard />}</Modal>}
      {modalOpen && (
        <Modal>
          {isTaskOpen && <NewTask id={newTaskId} columnNames={columnNames} />}
        </Modal>
      )}
    </>
  );
};

export default ModalBoard;
