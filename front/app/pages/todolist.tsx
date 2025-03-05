import { ToDoCard } from "~/components/elements/todoCard";
import type { Task } from "~/features/ToDoTasks/dto/Task";

export function ToDoList({ tasks }: { tasks: Task[] }) {
  const columns = {
    "To Do": tasks.filter((task) => task.status === "to do"),
    "In Progress": tasks.filter((task) => task.status === "in progress"),
    "Done & Canceled": tasks.filter(
      (task) => task.status === "done" || task.status === "canceled"
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(columns).map(([columnTitle, columnTasks]) => (
        <div key={columnTitle} className="space-y-4">
          <h2 className="text-2xl font-bold">{columnTitle}</h2>
          {columnTasks.map((task) => (
            <ToDoCard key={task.id} task={task} />
          ))}
        </div>
      ))}
    </div>
  );
}
