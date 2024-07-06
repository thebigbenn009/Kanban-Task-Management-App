import React from "react";
import cross from "@/public/icon-add-task-mobile.svg";
import verticalEllipse from "@/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import EmptyBoard from "@/components/EmptyBoard";

import { UserButton } from "@clerk/nextjs";
import prisma from "@/utils/db";

const TasksPage = async () => {
  const boards = await prisma.board.findMany({
    include: {
      columns: true,
    },
  });
  console.log(JSON.stringify(boards, null, 2));

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
      <div className="task-body">{boards.length === 0 && <EmptyBoard />}</div>
    </section>
  );
};

export default TasksPage;
