"use server";

import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { Prisma, PrismaClient } from "@prisma/client";

// import prisma from "./db";
const prisma = new PrismaClient();
import { revalidatePath } from "next/cache";

interface ColumnData {
  name: string;
}
export interface BoardDataType {
  columns: ColumnData[];
  boardName: string;
}
interface SubtaskData {
  name: string;
}

interface TaskData {
  title: string;
  description?: string;
  subtasks: SubtaskData[];
  status: string;
}
function isPrismaClientKnownRequestError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "meta" in error
  );
}
function isUniqueConstraintViolationError(
  error: Prisma.PrismaClientKnownRequestError
): error is Prisma.PrismaClientKnownRequestError & {
  meta: { target: string[] };
} {
  return error.code === "P2002" && Array.isArray((error.meta as any).target);
}
export const createNewBoard = async function (data: BoardDataType) {
  const currUser = await currentUser();
  const email = currUser?.emailAddresses[0]?.emailAddress;

  try {
    if (!email) {
      throw new Error("User is not authenticated");
    }
    //find user from database or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email as string,
        },
      });
    }
    //create new board
    const newBoard = await prisma.board.create({
      data: {
        name: data.boardName,
        user: { connect: { id: user.id } },
        columns: {
          create: data.columns.map((column) => ({
            name: column.name,
          })),
        },
      },
    });

    revalidatePath("/tasks");

    return {
      message: "Board created successfully",
    };
  } catch (error) {
    if (
      isPrismaClientKnownRequestError(error) &&
      isUniqueConstraintViolationError(error) &&
      error.meta.target.includes("Column_name_boardId_unique")
    ) {
      throw new Error("Column names must be unique within the same board");
    }
    console.error(error);
  }
};
export const createTask = async function (data: TaskData, boardId: string) {
  try {
    //find the column ID based on the status
    const column = await prisma.column.findFirst({
      where: {
        name: data.status,
        boardId: boardId,
      },
    });
    if (!column) throw new Error("Column does not exist");
    //create the task
    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        column: {
          connect: {
            id: column.id,
          },
        },
        subtasks: {
          create: data.subtasks.map((subtask) => ({
            title: subtask.name,
            isCompleted: false,
          })),
        },
      },
    });
    revalidatePath("/tasks");
    // Fetch the updated board with its columns and tasks
    const updatedBoard = await prisma.board.findUnique({
      where: { id: boardId },
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

    if (!updatedBoard) {
      throw new Error("Board not found");
    }

    // Log the updated board information in JSON format
    console.log(JSON.stringify(updatedBoard, null, 2));
    revalidatePath("/tasks");
    return newTask;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBoard = async function (boardId: string) {
  try {
    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board) throw new Error("Board does not exist");
    await prisma.board.delete({
      where: { id: boardId },
    });
    revalidatePath("/tasks");
    console.log(
      `Board with ID ${boardId} and its related entities have been deleted successfully`
    );
  } catch (error) {
    console.error("Error deleting board:", error);
  }
};
