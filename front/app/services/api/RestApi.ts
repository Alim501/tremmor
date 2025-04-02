export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const BASE_URL = "/api";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `${token}` }
    : { "Content-Type": "application/json" };
}

export async function apiFetch<T>(
  path: string,
  method: string = "GET",
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const url = `${BASE_URL}/${path}`;
    const options: RequestInit = {
      method,
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка запроса");
    }

    return { data };
  } catch (error) {
    console.log(error);
    return { error: String(error) };
  }
}

export const api = {
  getAll: <T>(route: string = "") => apiFetch<T[]>(route),
  getById: <T>(route: string, id: number | string) =>
    apiFetch<T>(`${route}/${id}`),
  create: <T>(route: string, data: T) => apiFetch<T>(route, "POST", data),
  update: <T>(route: string, id: number | string, data: Partial<T>) =>
    apiFetch<T>(`${route}/${id}`, "PUT", data),
  remove: (route: string, id: number | string) =>
    apiFetch<number | string>(`${route}/${id}`, "DELETE"),
};
