import { useNavigate } from "react-router-dom";
import type { TaskCreateDTO } from "../../../types/taskTypes";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface TaskListProps {
  tasks: TaskCreateDTO[];
}

export default function TaskList({
  tasks,
}: TaskListProps) {
  const navigate = useNavigate();

  if (tasks?.length === 0) {
    return (
      <p className="text-gray-500">
        No tasks yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
      {tasks?.map((task) => (
        <Card
          key={task?.id}
          className="shadow-md cursor-pointer hover:bg-gray-50"
          onClick={() =>
            navigate(`/tasks/${task?.id}`)
          }
        >
          <CardContent>
            <Typography variant="h6">
              {task?.title}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-600"
            >
              {task?.description}
            </Typography>
            <Typography
              variant="caption"
              className="block mt-2"
            >
              {task?.start_date
                ? `Start: ${new Date(
                    task?.start_date
                  )?.toLocaleDateString()}`
                : ""}
            </Typography>
            <Typography
              variant="caption"
              className="block"
            >
              {task?.end_date
                ? `End: ${new Date(
                    task?.end_date
                  )?.toLocaleDateString()}`
                : ""}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
