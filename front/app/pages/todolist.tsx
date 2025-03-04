import { ToDoCard } from "~/components/elements/todoCard";
import type { Task } from "~/features/ToDoTasks/dto/Task";

export function ToDoList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <ToDoCard key={task.id} task={task} />
      ))}
    </div>
  );
}
