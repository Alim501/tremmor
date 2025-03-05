import { useState } from "react";
import { Link, Outlet } from "react-router";
import Timer from "~/features/Timer/Timer";
import NavBar from "./NavBar";

export function ToDoLayout() {
  const [open, setOpen] = useState(false);
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <NavBar></NavBar>
        <Timer></Timer>
        <Outlet />
      </div>
    </main>
  );
}
