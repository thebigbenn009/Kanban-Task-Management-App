export const boardForm = {
  defaultValues: {
    boardName: "Tutorials",
    newColumns: [{ name: "JavaScript" }, { name: "Dart" }],
  },
};

export const newTaskForm = {
  defaultValues: {
    title: "Take Coffee break",
    description: `e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.`,
    subtasks: [
      {
        title: "Interview 10 customers",
        isCompleted: false,
      },
      {
        title: "Review common customer pain points and suggestions",
        isCompleted: false,
      },
      {
        title: "Outline next steps for our roadmap",
        isCompleted: false,
      },
    ],
  },
};
