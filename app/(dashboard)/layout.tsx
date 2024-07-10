import React from "react";

// import SingleBoard from "@/components/sidebar/Boards";
import ModalBoard from "@/components/ModalBoard";
import Boards from "@/components/sidebar/Boards";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="sidebar">
        <Boards />
      </div>
      {children}
    </main>
  );
};

export default layout;
