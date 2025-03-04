import type { Task } from "~/features/ToDoTasks/dto/Task";
import { api } from "./RestApi";

const TASK_ROUTE = "/tasks";

export async function fetchTask(): Promise<Task[]> {
  const response = await api.getAll<Task>(TASK_ROUTE);
  return response.data ?? [];
}

export async function getOneTask(id: number): Promise<Task> {
  const response = await api.getById<Task>(TASK_ROUTE, id);
  return response.data ?? ({} as Task);
}

export async function createTask(body: Task): Promise<Task> {
  const response = await api.create<Task>(TASK_ROUTE, body);
  return response.data ?? ({} as Task);
}

export async function updateTask(
  id: number,
  body: Partial<Task>
): Promise<Task> {
  const response = await api.update<Task>(TASK_ROUTE, id, body);
  return response.data ?? ({} as Task);
}

export async function deleteTask(id: number): Promise<number> {
  const response = await api.remove(TASK_ROUTE, id);
  return id;
}
