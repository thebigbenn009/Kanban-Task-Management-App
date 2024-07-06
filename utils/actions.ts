"use server";

import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

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
    console.error(error);
  }
};
export const fetchBoards = async () => {
  try {
    const boards = await prisma.board.findMany();
    return boards;
  } catch (error) {
    console.error(error);
    return [];
  }
};
