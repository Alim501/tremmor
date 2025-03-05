import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "~/store";
import TodoButton from "../elements/todoButton";
import { addTask, updateTask } from "~/features/ToDoTasks/taskThunks";
import { fetchCategories } from "~/services/api/CategoryApi";
import { fetchPriority } from "~/services/api/PriorityApi";
import type { Category } from "~/features/ToDoTasks/dto/Category";
import type { Priority } from "~/features/ToDoTasks/dto/Priority";
import type { Task } from "~/features/ToDoTasks/dto/Task";
import { getOneTask } from "~/services/api/TaskApi";

interface CreateTaskProps {
  taskId?: number;
}

export function CreateToDoTask({ taskId }: CreateTaskProps) {
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
      } catch (error) {
        console.error("Failed to fetch categories or priorities:", error);
      }
    };

    const loadTask = async () => {
      if (taskId) {
        try {
          const task: Task | null = await getOneTask(taskId);
          if (task) {
            setTaskTitle(task.title);
            setTaskCycles(task.cycles);
            setTaskStatus(task.status);
            setCategory(task.category ?? null);
            setPriority(task.priority ?? null);
          }
        } catch (error) {
          console.error("Failed to fetch task:", error);
        }
      }
    };

    loadData();
    loadTask();
  }, [taskId]);

  const handleSubmit = () => {
    if (taskTitle.trim()) {
      const newTask: Task = {
        id: taskId ?? Date.now(), // Если id нет — создаём новый
        title: taskTitle,
        status: taskStatus,
        cycles: taskCycles,
        cyclesCurrent: taskId ? 0 : 0, // Если редактируем, можно подставить текущее значение
        category: taskCategory,
        priority: taskPriority,
      };

      if (taskId) {
        dispatch(updateTask(newTask));
      } else {
        dispatch(addTask(newTask));
      }

      navigate("/todo");
    }
  };

  return (
    <div className="p-4 border rounded-lg  shadow-sm">
      <h2 className="text-xl font-bold mb-4">
        {taskId ? "Edit Task" : "Create Task"}
      </h2>

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
          <option key={category.id} value={category.id} className="bg-gray-500">
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
          <option key={priority.id} value={priority.id} className="bg-gray-500">
            {priority.title}
          </option>
        ))}
      </select>

      <TodoButton
        text={taskId ? "Update Task" : "Save Task"}
        color="green"
        onClick={handleSubmit}
      />
    </div>
  );
}
