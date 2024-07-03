"use server"

import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import prisma from "./db";
import { revalidatePath } from "next/cache";

interface ColumnData{
    name:string
}
interface BoardDataType{
    columns:ColumnData[]; 
    boardName:string
}



export const  createNewBoard = async function(data:BoardDataType){
   
    const currUser = await currentUser()
const email = currUser?.emailAddresses[0]?.emailAddress
   
try {
    if(!email){
        throw new Error("User is not authenticated")
    }
    //find user from database or create user
    let user = await prisma.user.findUnique({
        where:{email}
    }); 
    if(!user){
        user = await prisma.user.create({
            data:{
               
                email:email as string
            }
        })  
    }
    //create new board
 const newBoard =    await prisma.board.create({
        data:{
            name:data.boardName, 
            user: {connect:{id: user.id}}, 
            columns:{
                create: data.columns.map((column)=>({
                    name: column.name
                }))
            }
        }
    })

    const boardCheck = await prisma.board.findUnique({
        where: { id: newBoard.id },
        include: {
          columns: true,
        },
      });

      revalidatePath("/tasks");
  
      if (boardCheck) {
        console.log("Board created successfully:", boardCheck);
      } else {
        console.error("Failed to retrieve the created board.");
      }
    revalidatePath("/tasks");

  return {
    message: "Board created successfully",
  };
    
} catch (error) {
    console.error(error)
 }

}