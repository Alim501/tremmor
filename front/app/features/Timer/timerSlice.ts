import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../ToDoTasks/dto/Task";

interface TimerState {
  time: number;
  isRunning: boolean;
  isBrake: "no" | "short" | "long";
  currentTask: Task | null;
  count: number;
}

const initialState: TimerState = {
  time: 25 * 60,
  isBrake: "no",
  currentTask: null,
  isRunning: false,
  count: 0,
};

function changeTimer(state: TimerState) {
  if (state.isBrake === "no") {
    state.count++;
    state.isBrake = state.count % 4 === 0 ? "long" : "short";
    state.time = state.isBrake === "long" ? 15 * 60 : 5 * 60;
  } else {
    state.isBrake = "no";
    state.time = 25 * 60;

    if (state.currentTask) {
      state.currentTask.cyclesCurrent = Math.min(
        state.currentTask.cyclesCurrent + 1,
        state.currentTask.cycles
      );

      if (state.currentTask.cyclesCurrent >= state.currentTask.cycles) {
        state.currentTask.status = "done";
        state.currentTask = null;
      }
    }
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
      state.time = 25 * 60;
      state.isRunning = false;
      state.isBrake = "no";
      state.count = 0;
      state.currentTask = null;
    },
    tick: (state) => {
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
      }
      if (state.time === 0) {
        changeTimer(state);
      }
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
  },
});

export const { startTimer, stopTimer, resetTimer, tick, setCurrentTask } =
  timerSlice.actions;
export default timerSlice.reducer;
