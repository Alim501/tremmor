import { useState, useEffect } from "react";
import TodoButton from "../elements/todoButton";
import {
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "~/services/api/CategoryApi";
import type { Category } from "~/features/ToDoTasks/dto/Category";

export function CreateCategory() {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (e) {
        console.log(e);
      }
    };
    loadCategories();
  }, []);

  const handleSelectCategory = async (id: number) => {
    const category = await getOneCategory(id);
    if (category) {
      setCategoryTitle(category.title);
      setCategoryId(id);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
      if (categoryId === id) {
        setCategoryTitle("");
        setCategoryId(null);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Ошибка при удалении категории");
    }
  };

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
      setCategoryTitle("");
      setCategoryId(null);
      fetchCategories();
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

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Categories</h3>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between p-2 border rounded-md mt-2"
            >
              <span>{category.title}</span>
              <div>
                <TodoButton
                  text="Edit"
                  color="blue"
                  onClick={() => handleSelectCategory(category.id)}
                />
                <TodoButton
                  text="Delete"
                  color="red"
                  onClick={() => handleDeleteCategory(category.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
