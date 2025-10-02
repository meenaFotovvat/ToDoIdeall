import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import TopBar from "../components/TopBar";
import { fetchTasks } from "../features/tasks/taskSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(fetchTasks({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="m-[75px]">
      <TopBar />
      {loading && <p>Loading...</p>}
      <ul className="mt-4 space-y-2">
        {tasks?.map((task) => (
          <li
            key={task.id}
            className="p-3 border rounded-md bg-white"
          >
            <p className="font-semibold">
              {task?.title}
            </p>
            <p className="text-sm text-gray-600">
              {task?.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
