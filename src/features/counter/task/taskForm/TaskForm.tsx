import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { createTask } from "../taskSlice";
import styles from "./TaskForm.module.scss";

type Inputs = {
  taskTitle: string;
};

const TaskForm: React.VFC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const handleCreate = (data: Inputs) => {
    console.log(data);
    dispatch(createTask(data.taskTitle)); //data.taskTileがaction.payloadとなる
    reset();
  };

  return (
    <div className={styles.root}>
      <form
        onSubmit={handleSubmit(handleCreate)}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          inputRef={register}
          name="taskTitle"
          className={styles.text_field}
        />
      </form>
    </div>
  );
};

export default TaskForm;
