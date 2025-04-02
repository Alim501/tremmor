import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "~/features/ToDoTasks/taskThunks";
import { useAppDispatch, type RootState } from "~/store";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredResults(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, tasks]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-gray-500 mt-2">Загрузка...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <ul className="mt-4 space-y-2">
        {filteredResults.map((task) => (
          <li
            key={task.id}
            className="p-2 border border-gray-200 rounded-lg shadow-sm"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
