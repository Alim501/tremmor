import type { Priority } from "~/features/ToDoTasks/dto/Priority";
import { api } from "./RestApi";

const PRIORITY_ROUTE = "/tasks/priority";

export async function fetchPriority(): Promise<Priority[]> {
  const response = await api.getAll<Priority>(PRIORITY_ROUTE);
  return response.data ?? [];
}

export async function getOnePriority(id: number): Promise<Priority> {
  const response = await api.getById<Priority>(PRIORITY_ROUTE, id);
  return response.data ?? ({} as Priority);
}

export async function createPriority(body: Priority): Promise<Priority> {
  const response = await api.create<Priority>(PRIORITY_ROUTE, body);
  return response.data ?? ({} as Priority);
}

export async function updatePriority(
  id: number,
  body: Partial<Priority>
): Promise<Priority> {
  const response = await api.update<Priority>(PRIORITY_ROUTE, id, body);
  return response.data ?? ({} as Priority);
}

export async function deletePriority(id: number): Promise<number> {
  const response = await api.remove(PRIORITY_ROUTE, id);
  return id;
}
