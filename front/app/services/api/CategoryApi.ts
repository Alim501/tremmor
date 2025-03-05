import type { Category } from "~/features/ToDoTasks/dto/Category";
import { api } from "./RestApi";

const CATEGORY_ROUTE = "/tasks/category";
interface CreateCategoryPayload {
  title: string;
}
export async function fetchCategories(): Promise<Category[]> {
  const response = await api.getAll<Category>(CATEGORY_ROUTE);
  return response.data ?? [];
}

export async function getOneCategory(id: number): Promise<Category> {
  const response = await api.getById<Category>(CATEGORY_ROUTE, id);
  return response.data ?? ({} as Category);
}

export async function createCategory(title: string): Promise<Category> {
  const payload: CreateCategoryPayload = { title };
  const response = await api.create<Category>(
    CATEGORY_ROUTE,
    payload as unknown as Category
  );
  if (!response.data) {
    throw new Error("Не удалось создать категорию");
  }
  return response.data;
}

export async function updateCategory(
  id: number,
  body: Partial<Category>
): Promise<Category> {
  const response = await api.update<Category>(CATEGORY_ROUTE, id, body);
  return response.data ?? ({} as Category);
}

export async function deleteCategory(id: number): Promise<number> {
  await api.remove(CATEGORY_ROUTE, id);
  return id;
}
