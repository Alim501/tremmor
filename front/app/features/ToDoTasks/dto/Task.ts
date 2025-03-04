import type { Category } from "./Category";
import type { Priority } from "./Priority";

export interface Task {
  id: number;
  title: string;
  cycles: number;
  cyclesCurrent: number;
  status: "in progress" | "to do" | "done" | "canceled";
  priority: Priority | null;
  category: Category | null;
}
