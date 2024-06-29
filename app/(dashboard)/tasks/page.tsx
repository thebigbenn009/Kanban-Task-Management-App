import React from "react";
import cross from "@/public/icon-add-task-mobile.svg";
import verticalEllipse from "@/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import EmptyBoard from "@/components/EmptyBoard";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const TasksPage = async () => {
  const user = await currentUser();
  console.log(user);
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
      <div className="task-body">
        <EmptyBoard />
      </div>
    </section>
  );
};

export default TasksPage;
