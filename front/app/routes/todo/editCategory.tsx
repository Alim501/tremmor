import { useParams } from "react-router";
import { CreateCategory } from "~/components/forms/createCategory";

export default function editCategory() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      {id ? <CreateCategory /> : <p>Category not found</p>}
    </div>
  );
}
