import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TodoButton from "../elements/todoButton";
import {
  createPriority,
  getOnePriority,
  updatePriority,
  deletePriority,
  fetchPriority,
} from "~/services/api/PriorityApi";
import type { Priority } from "~/features/ToDoTasks/dto/Priority";

export function CreatePriority() {
  const navigate = useNavigate();
  const [priorityTitle, setPriorityTitle] = useState("");
  const [priorityColor, setPriorityColor] = useState("");
  const [priorityId, setPriorityId] = useState<number | null>(null);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  useEffect(() => {
    loadPriorities();
  }, []);

  const loadPriorities = async () => {
    const data = await fetchPriority();
    if (Array.isArray(data)) {
      setPriorities(data);
    } else {
      setPriorities([]);
    }
  };

  const handleSelectPriority = async (id: number) => {
    const priority = await getOnePriority(id);
    if (priority) {
      setPriorityTitle(priority.title);
      setPriorityColor(priority.color);
      setPriorityId(id);
    }
  };

  const handleDeletePriority = async (id: number) => {
    await deletePriority(id);
    loadPriorities();
    if (priorityId === id) {
      setPriorityTitle("");
      setPriorityColor("");
      setPriorityId(null);
    }
  };

  const handleSubmit = async () => {
    if (priorityTitle.trim()) {
      if (priorityId) {
        await updatePriority(priorityId, {
          title: priorityTitle,
          color: priorityColor,
        });
      } else {
        await createPriority({ title: priorityTitle, color: priorityColor });
      }
      setPriorityTitle("");
      setPriorityColor("");
      setPriorityId(null);
      loadPriorities();
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <label className="block text-sm font-medium">Title</label>
      <input
        type="text"
        value={priorityTitle}
        onChange={(e) => setPriorityTitle(e.target.value)}
        placeholder="Enter priority title"
        className="w-full p-2 mt-1 border rounded-md"
      />

      <label className="block text-sm font-medium">Color</label>
      <input
        type="text"
        value={priorityColor}
        onChange={(e) => setPriorityColor(e.target.value)}
        placeholder="Enter priority color"
        className="w-full p-2 mt-1 border rounded-md"
      />

      <TodoButton
        text={priorityId ? "Update Priority" : "Save Priority"}
        color="green"
        onClick={handleSubmit}
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Priorities</h3>
        <ul>
          {priorities.map((priority) => (
            <li
              key={priority.id}
              className="flex justify-between p-2 border rounded-md mt-2"
            >
              <span>
                {priority.title} ({priority.color})
              </span>
              <div>
                <TodoButton
                  text="Edit"
                  color="blue"
                  onClick={() => handleSelectPriority(priority.id)}
                />
                <TodoButton
                  text="Delete"
                  color="red"
                  onClick={() => handleDeletePriority(priority.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
