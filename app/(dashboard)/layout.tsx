"use client";
import Modal from "@/components/Modal";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const layout = ({ children }: { children: React.ReactNode }) => {
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  return (
    <main>
      {modalOpen && (
        <Modal>
          <h1>This is a modal</h1>
        </Modal>
      )}
      <div className="sidebar">This will be the side bar</div>
      {children}
    </main>
  );
};

export default layout;
