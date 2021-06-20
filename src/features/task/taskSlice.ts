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
  },
});

export const { createTask } = taskSlice.actions; //actions reducersの中で定義したロジック　今回はcreateTask
export const selectTask = (state: RootState): TaskState["tasks"] => state.task.tasks; //stateの中のtask(name)のなかのtasks
//useSelector(selectTask)これで、tasksのstateがゲットできる

export default taskSlice.reducer;
//storeの中のtaskReducerになる
