import { userLoggedIn } from "@/store/features/auth/auth.slice";
import { setUser } from "@/store/features/user/user.slice";
import { useAppDispatch } from "@/store/hook";
import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    const localUser = localStorage.getItem("user");

    if (localAuth && localUser) {
      const auth = JSON.parse(localAuth);
      const user = JSON.parse(localUser);

      if (user?.user && auth?.isLoggedIn) {
        dispatch(userLoggedIn());
        dispatch(setUser(user.user));
      }
    }
    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};
