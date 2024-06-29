"use client";
import React from "react";
import cross from "@/public/icon-cross.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { closeModal } from "@/app/features/modalSlice";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const handleCoseModal = () => {
    dispatch(closeModal());
  };
  return (
    <div className="overlay">
    <span onClick={handleCoseModal} className="close-btn"><svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fill-rule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg></span>

      {children}
    </div>
  );
};

export default Modal;
