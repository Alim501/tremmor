import { useEffect, useState } from "react";
import TodoButton from "../elements/todoButton";
import { useAppDispatch } from "~/store";
import { addTask } from "~/features/ToDoTasks/taskThunks";
import { useNavigate } from "react-router";
import { fetchCategories } from "~/services/api/CategoryApi";
import { fetchPriority } from "~/services/api/PriorityApi";
import type { Category } from "~/features/ToDoTasks/dto/Category";
import type { Priority } from "~/features/ToDoTasks/dto/Priority";

export function CreateToDoTask() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskCycles, setTaskCycles] = useState(1);
  const [taskCategory, setCategory] = useState<Category | null>(null);
  const [taskPriority, setPriority] = useState<Priority | null>(null);
  const [taskStatus, setTaskStatus] = useState<
    "in progress" | "to do" | "done" | "canceled"
  >("to do");

  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const prioritiesData = await fetchPriority();
        setCategories(categoriesData);
        setPriorities(prioritiesData);
        console.log(categories, priorities);
      } catch (error) {
        console.error("Failed to fetch categories or priorities:", error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = () => {
    if (taskTitle.trim()) {
      dispatch(
        addTask({
          id: 1,
          title: taskTitle,
          status: taskStatus,
          cycles: taskCycles,
          cyclesCurrent: 0,
          category: taskCategory,
          priority: taskPriority,
        })
      );
      setTaskTitle("");
      setTaskCycles(0);
      setCategory(null);
      setPriority(null);
      setTaskStatus("to do");
      navigate("/todo");
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-950 shadow-sm">
      <label className="block text-sm font-medium">Title</label>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-3 text-sm font-medium">Status</label>
      <select
        value={taskStatus}
        onChange={(e) =>
          setTaskStatus(
            e.target.value as "in progress" | "to do" | "done" | "canceled"
          )
        }
        className="w-full p-2 my-1 mb-3 border rounded-md"
      >
        <option value="to do">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Expired</option>
      </select>

      <label className="block mt-3 text-sm font-medium">Category</label>
      <select
        value={taskCategory?.id ?? ""}
        onChange={(e) => {
          const selectedCategory = categories.find(
            (cat) => cat.id === Number(e.target.value)
          );
          setCategory(selectedCategory ?? null);
        }}
        className="w-full p-2 my-1 mb-3 border rounded-md"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium">Cycles</label>
      <input
        type="number"
        value={taskCycles}
        onChange={(e) => setTaskCycles(Number(e.target.value))}
        placeholder="Enter task cycles"
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block mt-3 text-sm font-medium">Priority</label>
      <select
        value={taskPriority?.id ?? ""}
        onChange={(e) => {
          const selectedPriority = priorities.find(
            (pri) => pri.id === Number(e.target.value)
          );
          setPriority(selectedPriority ?? null);
        }}
        className="w-full p-2 my-1 mb-3 border rounded-md"
      >
        <option value="">Select priority</option>
        {priorities.map((priority) => (
          <option key={priority.id} value={priority.id}>
            {priority.title}
          </option>
        ))}
      </select>

      <TodoButton text="Save Task" color="green" onClick={handleSubmit} />
    </div>
  );
}
