import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../ToDoTasks/dto/Task";
import { completeCycleAndUpdateTasks, fetchAndSetTasks } from "./timerThunks";

interface TimerState {
  time: number;
  isRunning: boolean;
  isBrake: "no" | "short" | "long";
  count: number;
  tasks: Task[];
}
const initialState: TimerState = {
  time: 25, //* 60
  isBrake: "no",
  isRunning: false,
  count: 0,
  tasks: [],
};

function changeTimer(state: TimerState) {
  if (state.isBrake === "no") {
    state.count++;
    state.isBrake = state.count % 4 === 0 ? "long" : "short";
    state.time = state.isBrake === "long" ? 15 /* 60*/ : 5; //* 60;
  } else {
    state.isBrake = "no";
    state.time = 25; // * 60;
  }
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.time = 25; //* 60;
      state.isRunning = false;
      state.isBrake = "no";
      state.count = 0;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    tick: (state) => {
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
      }
    },
    changePhase: (state) => {
      changeTimer(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAndSetTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });

    builder.addCase(completeCycleAndUpdateTasks.fulfilled, (state) => {
      changeTimer(state);
    });

    builder.addCase(completeCycleAndUpdateTasks.rejected, (state, action) => {
      console.error("Failed to complete cycle:", action.error);
    });
  },
});

export const {
  startTimer,
  stopTimer,
  resetTimer,
  tick,
  setTasks,
  changePhase,
} = timerSlice.actions;

export default timerSlice.reducer;
