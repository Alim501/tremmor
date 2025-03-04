import { Link, Outlet } from "react-router";
import Timer from "~/features/Timer/Timer";

export function ToDoLayout() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <Timer></Timer>
        <Link to={"/todo"} className="text-5xl">
          My tasks
        </Link>
        <Outlet />
        <Link
          to={"/todo/create"}
          className="text-3xl rounded-full bg-gray-700 px-5 py-4"
        >
          Create task
        </Link>
      </div>
    </main>
  );
}
