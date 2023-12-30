import { useAppSelector } from "@/store/hook";

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);

  if (auth?.isLoggedIn && user?.user?.email) {
    return true;
  } else {
    return false;
  }
};
