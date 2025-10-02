import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TaskDetailsPage from "./pages/TaskDetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="tasks/:id"
            element={<TaskDetailsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
