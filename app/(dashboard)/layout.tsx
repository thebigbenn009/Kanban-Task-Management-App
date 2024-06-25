import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="sidebar">This will be the side bar</div>
      {children}
    </main>
  );
};

export default layout;
