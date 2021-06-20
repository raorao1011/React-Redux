import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { createTask } from "../taskSlice";
import styles from "./TaskForm.module.scss";

type Inputs = {
  taskTitle: string;
};

type PropsType = {
  edit?: boolean;
};

const TaskForm: React.VFC<PropsType> = ({ edit }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const handleCreate = (data: Inputs) => {
    console.log(data);
    dispatch(createTask(data.taskTitle)); //data.taskTileがaction.payloadとなる、タスク内容を送信
    reset(); //フォーム内容をリセット
  };

  const handleEdit = (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)} className={styles.form} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task " : "New Task"}
          defaultValue={edit ? "defaultValue" : ""}
          variant="outlined"
          inputRef={register}
          name="taskTitle" //dataの中にtaskTitleが渡される。
          className={styles.text_field}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button type="submit" className={styles.submit_button}>
              Submit
            </button>
            <button type="button" className={styles.cancel_button}>
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
