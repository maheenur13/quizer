import { useAppSelector } from "@/store/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: IProps) {
  const { role } = useAppSelector((state) => state.user.user);

  const location = useLocation();

  return !role ? <Navigate to="/" state={{ from: location }} /> : children;
}
