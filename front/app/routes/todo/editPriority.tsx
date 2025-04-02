import { useParams } from "react-router";
import { CreatePriority } from "~/components/forms/createPriority";

export default function edtiPriority() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Priority</h1>
      {id ? <CreatePriority /> : <p>Category not found</p>}
    </div>
  );
}
