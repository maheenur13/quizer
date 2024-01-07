import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const isLoggedIn = useAuth();
  const {
    user: { role },
  } = useAppSelector((state) => state.user);

  const location = useLocation();

  return !isLoggedIn ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : role === "admin" ? (
    <Navigate to="/questions" state={{ from: location }} />
  ) : (
    children
  );
}
