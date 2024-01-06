import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { useAuthCheck } from "./hooks/useAuthCheck";
import "./App.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function App() {
  const authChecked = useAuthCheck();
  return (
    <>
      {!authChecked ? (
        <div className="text-center p-4">Please wait</div>
      ) : (
        <RouterProvider router={routes} />
      )}
    </>
  );
}

export default App;
