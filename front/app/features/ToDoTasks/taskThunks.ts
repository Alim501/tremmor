import { createAsyncThunk } from "@reduxjs/toolkit";
import * as TaskApi from "../../services/api/TaskApi";
import type { Task } from "./dto/Task";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await TaskApi.fetchTask();
});

export const addTask = createAsyncThunk("tasks/addTask", async (task: Task) => {
  return await TaskApi.createTask(task);
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    return await TaskApi.updateTask(updatedTask.id, updatedTask);
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    await TaskApi.deleteTask(taskId);
    return taskId;
  }
);
