import { ToDoLayout } from "~/components/layout/todoLayout";
import RequireAuth from "~/components/RequireAuth";

export default function TodoLayout() {
  return (
    <RequireAuth>
      <ToDoLayout />
    </RequireAuth>
  );
}
