"use client";
import Modal from "@/components/Modal";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import NewBoard from "@/components/new board/NewBoard";

const layout = ({ children }: { children: React.ReactNode }) => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const isBoardOpen = useSelector((state: RootState) => state.modal.isBoardOpen); 
  return (
    <main>
      {modalOpen && (
        <Modal>
       {isBoardOpen && <NewBoard/>}   
        </Modal>
      )}
      <div className="sidebar">This will be the side bar</div>
      {children}
    </main>
  );
};

export default layout;
