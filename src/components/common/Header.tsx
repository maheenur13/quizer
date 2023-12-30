import { userLoggedOut } from "@/store/features/auth/auth.slice";
import { removeUser } from "@/store/features/user/user.slice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Badge } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const {
    user: { email, role },
  } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
  };

  return (
    <nav className="w-full h-16 sticky top-0 backdrop-blur-lg z-10 shadow-md">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <h5 className="font-semibold">QUIZER</h5>
          </div>
          <div>
            <ul className="flex items-center">
              <li className="p-3">
                <Link to="/">Home</Link>
              </li>
              <li className="p-3">
                <Link to="/answers">Answers</Link>
              </li>
              {role === "admin" && (
                <li className="p-3">
                  <Link to="/questions">Questions</Link>
                </li>
              )}
              <Badge className="mr-4" count={"role"} showZero>
                <li className="text-md px-3 py-2 bg-slate-200">
                  <p>{role}</p>
                </li>
              </Badge>
              {email && (
                <>
                  <li className="p-3">
                    <button
                      onClick={handleLogout}
                      className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      logout
                    </button>
                  </li>
                </>
              )}
              {!email && (
                <>
                  <li className="p-3">
                    <Link
                      to="/login"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/sign-up"
                      className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
