import React from "react";
import verticalEllipse from "@/public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import SingleColumn from "@/components/single column/SingleColumn";
import AddNewTaskButton from "@/components/new task/AddNewTaskButton";
import ModalBoard from "@/components/ModalBoard";
import TaskHeader from "@/components/TaskHeader";
import { deleteBoard } from "@/utils/actions";

const prisma = new PrismaClient();

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      },
    },
  });

  if (!board) {
    return <h1>Board not found</h1>; // Handle the case when board is not found
  }

  return (
    <>
      <ModalBoard
        deleteBoardId={id}
        newTaskId={id}
        columnNames={board.columns.map((column) => column.name) || []}
      />

      <section className="tasks">
        <TaskHeader name={board.name} />
        <div className="task-body">
          <div className="tasks-container">
            {board.columns.map((column, index) => {
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
                  column={{
                    name: column.name,
                    id: column.id,
                    tasks: column.tasks,
                  }}
                  color={colorIndex}
                />
              );
            })}
          </div>
          <div className="new-column">
            <button className="new-column-button">+ New Column</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
