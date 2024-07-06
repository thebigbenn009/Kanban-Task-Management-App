import React from "react";

import prisma from "@/utils/db";

const TasksPage = async () => {
  const boards = await prisma.board.findMany({
    include: {
      columns: true,
    },
  });
  console.log(JSON.stringify(boards, null, 2));

  return <h1>This is where the task goes</h1>;
};

export default TasksPage;
