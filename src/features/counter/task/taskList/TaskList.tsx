import React from "react";
import styles from "./TaskList.module.scss";
import TaskItem from "../taskItem/TaskItem";
import sampleData from "./Sample.data.json";

const TaskList: React.VFC = () => {
  return (
    <div className={styles.root}>
      {sampleData.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
