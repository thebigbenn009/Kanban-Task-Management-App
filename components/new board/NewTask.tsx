import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import RemoveInput from "../RemoveInput";
import ReactSelect from "react-select";
import { createTask } from "@/utils/actions";

interface NewTaskProps {
  id: string;
  columnNames: string[];
}

interface FormData {
  title: string;
  description?: string;
  subtasks: { name: string }[];
  status: string;
}

const NewTask: React.FC<NewTaskProps> = ({ id, columnNames }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      subtasks: [{ name: "" }, { name: "" }],
      status: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createTask(data, id);
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form new-board-form">
      {/* Rest of the form here */}
      <div className="new-board">
        <h3>Add New Task</h3>
      </div>
      <div className="form-inputs-container">
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          placeholder="e.g. Take Coffee Break"
          {...register("title", {
            required: {
              value: true,
              message: "cannot be empty",
            },
          })}
        />
        {errors?.title && (
          <span className="error">{errors?.title?.message}</span>
        )}
      </div>
      <div className="form-inputs-container">
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
          {...register("description")}
        />
        {errors?.description && (
          <span className="error">{errors?.description?.message}</span>
        )}
      </div>
      <div className="form-inputs-container">
        <label>Subtasks</label>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="add-column">
              <input
                type="text"
                placeholder="e.g. Make coffee"
                {...register(`subtasks.${index}.name`, {})}
              />
              <span className="error">
                {errors?.subtasks?.[index]?.name?.message}
              </span>
              <RemoveInput removeInput={() => remove(index)} />
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="btn btn-block btn-white"
        >
          <strong>+</strong> Add New Subtask
        </button>
      </div>
      <div className="form-inputs-container">
        <label>Status</label>
        <select {...register("status", {})}>
          {columnNames?.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-btn-container">
        <button className="btn btn-block" type="submit">
          Create new task
        </button>
      </div>
    </form>
  );
};

export default NewTask;
