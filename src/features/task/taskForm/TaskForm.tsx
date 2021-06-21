import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { createTask, editTask, handleModalOpen, selectSelectedTask } from "../taskSlice";
import styles from "./TaskForm.module.scss";

type Inputs = {
  taskTitle: string;
};

type PropsType = {
  edit?: boolean;
};

const TaskForm: React.VFC<PropsType> = ({ edit }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);

  const handleCreate = (data: Inputs) => {
    console.log(data);
    dispatch(createTask(data.taskTitle)); //data.taskTitleがaction.payloadとなる、タスク内容を送信
    reset(); //フォーム内容をリセット
  };

  const handleEdit = (data: Inputs) => {
    //dataにはインプットされた内容が入っている
    const sendData = { ...selectedTask, title: data.taskTitle }; // titleが被るから、新しく書き代わる

    /**
     * sendData = {
     *  id: ~~~,
     *  title: ~~~,
     *  isCompleted: ~~~,
     * }になる
     */

    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false)); //送信したら閉じる
  };

  return (
    <div className={styles.root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
        className={styles.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label={edit ? "Edit Task " : "New Task"}
          defaultValue={edit ? selectedTask.title : ""}
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
            <button
              type="button"
              onClick={() => dispatch(handleModalOpen(false))}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
