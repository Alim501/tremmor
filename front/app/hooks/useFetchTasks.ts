import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "~/features/ToDoTasks/taskThunks";
import type { AppDispatch, RootState } from "~/store";

export default function useFetchTasks() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  return tasks;
}
