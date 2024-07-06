"use client";
import Modal from "@/components/Modal";
import React from "react";
import { useSelector } from "react-redux";

import NewBoard from "@/components/new board/NewBoard";

import { RootState } from "@/app/store";

const ModalBoard = () => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const isBoardOpen = useSelector(
    (state: RootState) => state.modal.isBoardOpen
  );
  return <>{modalOpen && <Modal>{isBoardOpen && <NewBoard />}</Modal>}</>;
};

export default ModalBoard;
