import { AdminLayout, MainLayout } from "@/components/layouts";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Questions from "@/pages/Questions";
import AdminRoute from "./AdminRoute";

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
        <AdminLayout>
          <Questions />
        </AdminLayout>
      </AdminRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
