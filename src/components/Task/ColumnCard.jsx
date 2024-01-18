import React from "react";
import { useGlobalContext } from "../../context";
import { useDrag } from "react-dnd";

const ColumnCard = ({ title, length, numCompleted, id, initColumn }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id, initColumn },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  // console.log(isDragging);
  const { displayTask } = useGlobalContext();
  return (
    <article ref={drag} className="column-card" onClick={() => displayTask(id)}>
      <p>{title}</p>
      <small>
        {numCompleted} of {length} subtasks
      </small>
    </article>
  );
};

export default ColumnCard;
