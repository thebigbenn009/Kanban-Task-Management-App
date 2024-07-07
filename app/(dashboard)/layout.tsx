import React from "react";

import SingleBoard from "@/components/sidebar/Boards";
import ModalBoard from "@/components/ModalBoard";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {/* <ModalBoard /> */}
      <div className="sidebar">
        <SingleBoard />
      </div>
      {children}
    </main>
  );
};

export default layout;
