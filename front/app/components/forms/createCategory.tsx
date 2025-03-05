import { useState, useEffect } from "react";
import TodoButton from "../elements/todoButton";
import {
  createCategory,
  getOneCategory,
  updateCategory,
} from "~/services/api/CategoryApi";
import { useNavigate } from "react-router";

interface CreateCategoryProps {
  categoryId?: number;
}

export function CreateCategory({ categoryId }: CreateCategoryProps) {
  const navigate = useNavigate();
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    if (categoryId) {
      getOneCategory(categoryId).then((category) =>
        setCategoryTitle(category.title)
      );
    }
  }, [categoryId]);

  const handleSubmit = async () => {
    if (categoryTitle.trim()) {
      if (categoryId) {
        await updateCategory(categoryId, {
          id: categoryId,
          title: categoryTitle,
        });
      } else {
        await createCategory(categoryTitle);
      }
      navigate("/todo");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <label className="block text-sm font-medium">Title</label>
      <input
        type="text"
        value={categoryTitle}
        onChange={(e) => setCategoryTitle(e.target.value)}
        placeholder="Enter category title"
        className="w-full p-2 mt-1 border rounded-md"
      />
      <TodoButton
        text={categoryId ? "Update Category" : "Save Category"}
        color={categoryId ? "blue" : "green"}
        onClick={handleSubmit}
      />
    </div>
  );
}
