import React from "react";
import cross from "@/public/icon-add-task-mobile.svg";
import verticalEllipse from "@/public/icon-vertical-ellipsis.svg";
import Image from "next/image";

import { UserButton } from "@clerk/nextjs";

const InnerPageNav = () => {
  return (
    <section className="tasks">
      <div className="task-header">
        <h1 className="header-left">Platform Launch</h1>
        <div className="header-left">
          <button className="btn btn-prime">
            <span>
              <Image src={cross} alt="cross" />
            </span>
            Add New Task
          </button>
          <span className="ellipse">
            <Image alt="ellipse" src={verticalEllipse} />
          </span>
          <span className="user-icon">
            <UserButton />
          </span>
        </div>
      </div>
    </section>
  );
};

export default InnerPageNav;
