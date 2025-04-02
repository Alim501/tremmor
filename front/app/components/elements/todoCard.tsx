import React, { useState } from "react";
import { useAppDispatch } from "~/store";
import type { Task } from "~/features/ToDoTasks/dto/Task";
import { deleteTask, updateTask } from "~/features/ToDoTasks/taskThunks";
import { useNavigate } from "react-router";

export function ToDoCard({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [taskStatus, setTaskStatus] = useState<Task["status"]>(task.status);
  const [menuOpen, setMenuOpen] = useState(false); // состояние для меню

  const statusColors: Record<
    "in progress" | "to do" | "done" | "canceled",
    string
  > = {
    "in progress": "bg-yellow-500",
    "to do": "bg-blue-500",
    done: "bg-green-500",
    canceled: "bg-red-500",
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Task["status"];
    setTaskStatus(newStatus);

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    dispatch(updateTask(updatedTask));
  };

  const handleEdit = () => {
    navigate(`edit/${task.id}`);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (confirm(`Вы уверены, что хотите удалить задачу "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
      setMenuOpen(false);
    }
  };
  return (
    <div className="relative max-w-sm rounded-xl overflow-hidden border rounded-lg shadow-sm p-5 cursor-pointer">
      {/* Иконка троеточия */}
      <div className="absolute top-3 right-3">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <div className="text-xl">⋮</div>
        </button>

        {/* Выпадающее меню */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded-md shadow-lg z-50">
            <button
              onClick={handleEdit}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              ✏️ Редактировать
            </button>
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              🗑️ Удалить
            </button>
          </div>
        )}
      </div>
      <div className="p-3">
        {/* Статус */}
        <select
          value={taskStatus}
          onChange={handleStatusChange}
          className={`w-full p-2 my-1 mb-5 border rounded-md ${statusColors[taskStatus]}`}
        >
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>

        {/* Основная информация */}
        <h2 className="font-bold text-xl mt-2">{task.title}</h2>
        <h2 className="font-bold text-xl mt-2">
          {task.cyclesCurrent}/{task.cycles}
        </h2>
        <h2 className="font-bold text-xl mt-2">{task.priority?.title}</h2>
        <h2 className="font-bold text-xl mt-2">{task.category?.title}</h2>
      </div>
    </div>
  );
}
