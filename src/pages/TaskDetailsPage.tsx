import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import { getTaskById } from "../features/tasks/taskSlice";

export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(
    (state) => state.task
  );
  const task = tasks.find(
    (task) => task?._id === id
  );

  useEffect(() => {
    if (!task && id) {
      dispatch(getTaskById(id));
    }
  }, [id, task, dispatch]);

  if (!task)
    return (
      <p className="text-gray-500 mt-[75px]">
        Loading...
      </p>
    );

  return (
    <Card className="max-w-md mx-auto shadow-md mt-[75px]">
      <CardContent>
        <Typography variant="h5">
          {task?.title}
        </Typography>
        <Typography
          variant="body1"
          className="mt-2"
        >
          {task?.description}
        </Typography>
        <Typography
          variant="caption"
          className="block mt-2"
        >
          {task?.start_date
            ? `Start: ${new Date(
                task.start_date
              ).toLocaleDateString()}`
            : ""}
        </Typography>
        <Typography
          variant="caption"
          className="block"
        >
          {task?.end_date
            ? `End: ${new Date(
                task.end_date
              ).toLocaleDateString()}`
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
}
