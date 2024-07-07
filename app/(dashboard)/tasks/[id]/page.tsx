import React from "react";
import verticalEllipse from "@/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import prisma from "@/utils/db";
import SingleColumn from "@/components/single column/SingleColumn";
import AddNewTaskButton from "@/components/new task/AddNewTaskButton";
import ModalBoard from "@/components/ModalBoard";
import { Board } from "@prisma/client";

type Column = {
  id: string;
  name: string;
};

// interface BoardWithColumns extends Board {
//   columns: Column[];
// }

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  const board = await prisma.board.findUnique({
    where: { id },
    include: { columns: true },
  });
  const columnId = board;
  console.log(columnId);
  return (
    <>
      <ModalBoard
        newTaskId={id}
        columnNames={board?.columns.map((column) => column.name) || []}
      />
      <section className="tasks">
        <div className="task-header">
          <h1 className="header-left">{board?.name}</h1>
          <div className="header-left">
            <AddNewTaskButton />
            <span className="ellipse">
              <Image alt="ellipse" src={verticalEllipse} />
            </span>
            <span className="user-icon">
              <UserButton />
            </span>
          </div>
        </div>
        <div className="task-body">
          {board?.columns.map((column, index) => {
            const colorIndex =
              index === 0
                ? "#49C4E5"
                : index === 1
                ? "#8471F2"
                : index === 2
                ? "#67E2AE"
                : "#333";
            return (
              <SingleColumn
                key={column.id}
                name={column.name}
                id={column.id}
                color={colorIndex}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Page;
