import { useEffect, type JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; 
  }

  return children;
}
