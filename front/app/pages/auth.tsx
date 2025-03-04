import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setCurrentTask } from "~/features/Timer/timerSlice";
import type { Task } from "~/features/ToDoTasks/dto/Task";
import { updateTask } from "~/features/ToDoTasks/taskThunks";
import { useAppDispatch, type RootState } from "~/store";

export function ToDoCard({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const currentTask = useSelector(
    (state: RootState) => state.timer.currentTask
  );

  const statusColors: Record<
    "in progress" | "to do" | "done" | "canceled",
    string
  > = {
    "in progress": "bg-yellow-500",
    "to do": "bg-blue-500",
    done: "bg-green-500",
    canceled: "bg-red-500",
  };

  const [taskStatus, setTaskStatus] = useState<Task["status"]>(task.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Task["status"];
    setTaskStatus(newStatus);

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    dispatch(updateTask(updatedTask));
  };

  const handleCardClick = () => {
    dispatch(setCurrentTask(task));
    console.log(task)
  };

  const isSelected = currentTask?.id === task.id;

  return (
    <div
      className={`max-w-sm rounded-xl overflow-hidden bg-gray-700 text-white shadow-lg p-5 cursor-pointer ${
        isSelected ? "shadow-sm shadow-gray-500" : ""
      }`}
      onClick={handleCardClick}
    >
      <select
        value={taskStatus}
        onChange={handleStatusChange}
        className={`w-full p-2 my-1 mb-3 border rounded-md text-white ${statusColors[taskStatus]}`}
      >
        <option value="to do">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      <h2 className="font-bold text-xl mt-2">{task.title}</h2>
      <h2 className="font-bold text-xl mt-2">
        {task.cyclesCurrent}/{task.cycles}
      </h2>
      <h2 className="font-bold text-xl mt-2">{task.priority?.title}</h2>
      <h2 className="font-bold text-xl mt-2">{task.category?.title}</h2>
    </div>
  );
}
