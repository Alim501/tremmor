import { useParams } from "react-router";
import { CreatePriority } from "~/components/forms/createPriority";
import { CreateToDoTask } from "~/components/forms/createToDoTask";

export default function edtiTask() {
  const { id } = useParams<{ id: string }>();
  const taskId = id ? Number(id) : undefined;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      {id ? <CreateToDoTask taskId={taskId} /> : <p>Category not found</p>}
    </div>
  );
}
