import { ToDoList } from "~/pages/todolist";
import type { Route } from "../+types/home";
import useFetchTasks from "~/hooks/useFetchTasks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "To Do List Pomodoro App" },
    { name: "To do laboratory App", content: "Task lists, Pomodoro timer" },
  ];
}

export default function Home() {
  const tasks = useFetchTasks();
  return <ToDoList tasks={tasks} />;
}
