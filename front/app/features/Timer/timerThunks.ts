import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "~/store";
import { fetchTask, updateTask } from "~/services/api/TaskApi";

export const fetchAndSetTasks = createAsyncThunk(
  "timer/fetchAndSetTasks",
  async () => {
    return fetchTask();
  }
);

export const completeCycleAndUpdateTasks = createAsyncThunk(
  "timer/completeCycleAndUpdateTasks",
  async (_, { getState }) => {
    const { timer } = getState() as RootState;
    const updatedTasks = timer.tasks
      .filter((task) => task.status === "in progress")
      .map(async (task) => {
        const updatedCycles = Math.min(task.cyclesCurrent + 1, task.cycles);
        const updatedTask = {
          ...task,
          cyclesCurrent: updatedCycles,
          status: updatedCycles >= task.cycles ? "done" : task.status,
        };
        await updateTask(task.id, updatedTask);
        return updatedTask;
      });
    await Promise.all(updatedTasks);
  }
);
