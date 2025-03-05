import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import TodoButton from "../elements/todoButton";
import {
  createPriority,
  getOnePriority,
  updatePriority,
} from "~/services/api/PriorityApi";

interface CreatePriorityProps {
  priorityId?: number;
}
export function CreatePriority({ priorityId }: CreatePriorityProps) {
  const navigate = useNavigate();

  const [priorityTitle, setPriorityTitle] = useState("");
  const [priorityColor, setPriorityColor] = useState("");

  useEffect(() => {
    if (priorityId) {
      const fetchPriority = async () => {
        try {
          const priority = await getOnePriority(Number(priorityId));
          if (priority) {
            setPriorityTitle(priority.title);
            setPriorityColor(priority.color);
          }
        } catch (error) {
          console.error("Failed to fetch priority:", error);
        }
      };

      fetchPriority();
    }
  }, [priorityId]);

  const handleSubmit = async () => {
    if (priorityTitle.trim()) {
      if (priorityId) {
        // Редактирование существующего
        await updatePriority(Number(priorityId), {
          title: priorityTitle,
          color: priorityColor,
        });
      } else {
        // Создание нового
        await createPriority({
          title: priorityTitle,
          color: priorityColor,
        });
      }

      setPriorityTitle("");
      setPriorityColor("");
      navigate("/todo");
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
    </div>
  );
}
