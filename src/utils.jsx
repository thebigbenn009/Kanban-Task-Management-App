export const setBackgroundColor = (taskName) => {
  switch (taskName.toLowerCase()) {
    case "todo":
      return "#49C4E5";
      break;
    case "doing":
      return "#8471F2";
      break;
    case "done":
      return "#67E2AE";
      break;
    default:
      return "";
      break;
  }
};
console.log(setBackgroundColor("todo"));
