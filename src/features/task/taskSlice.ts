import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface TaskState {
  // Taskが何個あるのかを管理する
  idCount: number;
  // storeに保存するタスクの一覧(配列)
  tasks: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
  // taskのtitleを編集する際にどのtaskが選択されているか
  selectedTask: {
    id: number;
    title: string;
    isCompleted: boolean;
  };
  // Modalが開くか閉じるかのフラグメント
  isModalOpne: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [
    {
      id: 1,
      title: "Task A",
      isCompleted: false,
    },
  ],
  selectedTask: {
    id: 0,
    title: "",
    isCompleted: false,
  },
  isModalOpne: false,
};

export const taskSlice = createSlice({
  //作成するsliceの名前、actionTypeを生成する時のprefix、type: name/OO
  name: "task",
  initialState,
  // どのようにstateを変更するかのロジック部分
  reducers: {
    // taskの作成ロジック
    createTask: (state, action) => {
      //taskの数を１増やす
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload, //actionに必要なデータ
        isCompleted: false,
      };
      // 今までのタスクの先頭に新しいタスクを足す
      state.tasks = [newTask, ...state.tasks];
    },
    // タスクの編集
    editTask: (state, action) => {
      // state.tasksの中から指定したtaskを抜き出している
      const task = state.tasks.find((task) => task.id === action.payload.id); //tasksは配列
      
      if (task) {
        task.title = action.payload.title;
      }
    },
    // どのタスクを選択しているか
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    // Modalを開くか閉じるかのフラグ
    handleModalOpen: (state, action) => {
      state.isModalOpne = action.payload;
    },
  },
});

export const { createTask, editTask, selectTask, handleModalOpen } = taskSlice.actions; //actions reducersの中で定義したロジック 今回はcreateTask

export const selectTasks = (state: RootState): TaskState["tasks"] => state.task.tasks; //stateの中のtask(name)のなかのtasks
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpne"] => state.task.isModalOpne;
export const selectSelectedTask = (state: RootState): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
//storeの中のtaskReducerになる
