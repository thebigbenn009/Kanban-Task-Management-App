import React from "react";

const ModalWrapper = ({ children, modal }) => {
  return <div className={`overlay ${modal ? "active" : ""}`}>{children}</div>;
};

export default ModalWrapper;
