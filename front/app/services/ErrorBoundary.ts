import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && typeof error === "object" && "status" in error) {
      const err = error as { status: number; statusText?: string };

      alert(
        `Ошибка: ${err.status} - ${err.statusText || "Неизвестная ошибка"}`
      );

      if (err.status === 401) {
        setTimeout(() => navigate("/login"), 500);
      }
    }
  }, [error, navigate]);

  return null;
}
