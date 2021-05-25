import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../app/store";

export interface TaskState {
  // Taskが何個あるのかを管理する
  idCount: number;
  // storeに保存するタスクの一覧
  tasks: {
    id: number;
    title: string;
    isComplete: boolean;
  }[];
  // taskのtitleを編集する際にどのtaskが選択されているか
  selectedTask: {
    id: number;
    title: string;
    isComplete: boolean;
  };
  // Modalを開くかどうか
  isModalOpne: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{
    id: 1,
    title: "Task A",
    isComplete: false,
  }],
  selectedTask: {
    id: 0,
    title: "",
    isComplete: false,
  },
  isModalOpne: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // taskの作成
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        isComplete: false,
      };
      state.tasks = [newTask, ...state.tasks]
    },
  },
});

export const { createTask } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTask = (state: RootState): TaskState["tasks"] => state.task.tasks;


export default taskSlice.reducer;
