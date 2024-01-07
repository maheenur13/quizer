import { MainLayout } from "@/components/layouts";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Questions from "@/pages/Questions";
import AdminRoute from "./AdminRoute";
import Answer from "@/pages/questions/Answer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Home />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/questions",
    element: (
      <AdminRoute>
        <MainLayout>
          <Questions />
        </MainLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/questions/answer/:quizId",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Answer />
        </MainLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
