import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import { selectTask, handleModalOpen, selectIsModalOpen } from "../taskSlice";
import TaskForm from "../taskForm/TaskForm";
import styles from "./TaskItem.module.scss";

interface PropsTypes {
  task: {
    id: number;
    title: string;
    isCompleted: boolean;
  };
}

const TaskItem: React.VFC<PropsTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen); //openのフラグをstoreから引っ張ってきてる
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task)); // 選択したタスクの情報がselectedTaskに格納される
    dispatch(handleModalOpen(true)); // stateの変更データを送信 これはtrueを送信（設定）している
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.isCompleted}
          onClick={() => console.log(`check ${task.id}`)}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button onClick={() => console.log(`delete ${task.id}`)} className={styles.delete_button}>
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
