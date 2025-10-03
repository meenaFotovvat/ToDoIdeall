import { useNavigate } from "react-router-dom";
import type { TaskCreateDTO } from "../../../types/taskTypes";
import {
  Card,
  CardContent,
  Typography,
  Chip,
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
      {tasks?.map((task) => {
        const isCompleted = Boolean(
          task?.is_completed
        );
        return (
          <Card
            key={task?._id}
            className={
              `relative overflow-hidden cursor-pointer transition-colors border ` +
              (isCompleted
                ? "bg-green-50 border-green-200 hover:bg-green-100"
                : "bg-white border-gray-200 hover:bg-gray-50")
            }
            onClick={() =>
              navigate(`/tasks/${task?._id}`)
            }
          >
            {/* status bar */}
            <div
              className={
                `absolute left-0 top-0 h-full w-1 ` +
                (isCompleted
                  ? "bg-green-400"
                  : "bg-blue-400")
              }
            />

            <CardContent className="pr-3">
              <div className="flex items-start justify-between gap-2">
                <Typography
                  variant="h6"
                  className={
                    isCompleted
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }
                >
                  {task?.title}
                </Typography>
                {isCompleted && (
                  <Chip
                    size="small"
                    color="success"
                    label="Completed"
                  />
                )}
              </div>

              {task?.description && (
                <Typography
                  variant="body2"
                  className={
                    "mt-1 " +
                    (isCompleted
                      ? "text-gray-500"
                      : "text-gray-700")
                  }
                >
                  {task?.description}
                </Typography>
              )}

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <Typography
                  variant="caption"
                  className="block"
                >
                  {task?.start_date
                    ? `Start: ${new Date(
                        task?.start_date
                      )?.toLocaleDateString()}`
                    : "Start: —"}
                </Typography>
                <Typography
                  variant="caption"
                  className="block text-right"
                >
                  {task?.end_date
                    ? `End: ${new Date(
                        task?.end_date
                      )?.toLocaleDateString()}`
                    : "End: —"}
                </Typography>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
