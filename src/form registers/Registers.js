import { nanoid } from "nanoid";
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
export const editForm = {
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
export const assignIds = (obj) => {
  if (Array.isArray(obj)) {
    // If the object is an array, iterate over each element and recursively call the function
    obj.forEach((item) => assignIds(item));
  } else if (typeof obj === "object" && obj !== null) {
    // If the object is an object (not an array and not null), assign an id and recursively call the function for nested objects
    obj.id = nanoid();
    Object.values(obj).forEach((value) => assignIds(value));
  }
};
