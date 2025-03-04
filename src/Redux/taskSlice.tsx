import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  category: string;
  deadline: string;
  time: string;
  color: string;
  note: string;
}

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null; // Stores the task being edited
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload; // Store the task to edit
    },
  },
});

export const { addTask, updateTask, deleteTask, setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
