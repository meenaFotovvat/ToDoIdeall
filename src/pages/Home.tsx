import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import TopBar from "../components/TopBar";
import { fetchTasks } from "../features/tasks/taskSlice";
import TaskList from "../features/tasks/components/TaskList";

export default function Home() {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector(
    (state) => state?.task
  );

  useEffect(() => {
    dispatch(fetchTasks({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="m-[75px]">
      <TopBar />
      {loading && <p>Loading...</p>}
      <TaskList tasks={tasks} />
    </div>
  );
}
