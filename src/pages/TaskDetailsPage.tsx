import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  Typography,
  Card,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import {
  deleteTask,
  getTaskById,
  updateTask,
  fetchTasks,
} from "../features/tasks/taskSlice";

export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.task.tasks.find(
      (task) => task._id === id
    )
  );

  const { pagination, filters } = useAppSelector(
    (s) => s.task
  );

  const [editableTask, setEditableTask] =
    useState({
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      completed: false,
    });

  useEffect(() => {
    if (task) {
      setEditableTask({
        title: task.title || "",
        description: task.description || "",
        start_date: task.start_date
          ? new Date(task.start_date)
              .toISOString()
              .split("T")[0]
          : "",
        end_date: task.end_date
          ? new Date(task.end_date)
              .toISOString()
              .split("T")[0]
          : "",
        completed: task.is_completed || false,
      });
    } else if (id) {
      dispatch(getTaskById(id));
    }
  }, [id, task, dispatch]);

  if (!task)
    return (
      <p className="text-gray-500 mt-8">
        Loading...
      </p>
    );

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditableTask({
      ...editableTask,
      [name]: value,
    });
  };

  // Handle checkbox
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditableTask({
      ...editableTask,
      completed: e.target.checked,
    });
  };

  // Update task
  const handleUpdate = async () => {
    if (
      !editableTask.title.trim() ||
      !editableTask.description.trim()
    )
      return;
    const payload = {
      title: editableTask.title,
      description: editableTask.description,
      start_date: editableTask.start_date,
      end_date: editableTask.end_date,
      is_completed: editableTask.completed,
    };
    try {
      await dispatch(
        updateTask({
          id: task._id || "",
          data: payload,
        })
      ).unwrap();
      // Refresh list with current filters so the change appears immediately
      dispatch(
        fetchTasks({
          page: pagination.page,
          limit: pagination.limit,
          title: filters.search,
          sort: filters.sortBy,
          order: filters.sortOrder,
          is_completed: filters.isCompleted,
        })
      );
      navigate("/"); // Go back to home
    } catch {
      // to do - no-op; could show toast in future
    }
  };

  // Delete task
  const handleDelete = async () => {
    try {
      await dispatch(
        deleteTask(task._id || "")
      ).unwrap();
      // Refresh list with current filters so pagination recalculates
      dispatch(
        fetchTasks({
          page: pagination.page,
          limit: pagination.limit,
          title: filters.search,
          sort: filters.sortBy,
          order: filters.sortOrder,
          is_completed: filters.isCompleted,
        })
      );
    } finally {
      navigate("/");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-20 shadow-md p-4">
      <Typography variant="h5" className="mb-4">
        Edit Task
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={editableTask.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={editableTask.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      <TextField
        label="Start Date"
        name="start_date"
        type="date"
        value={editableTask.start_date}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="End Date"
        name="end_date"
        type="date"
        value={editableTask.end_date}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={editableTask.completed}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Completed"
      />

      <Box className="flex gap-4 mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={
            !editableTask.title.trim() ||
            !editableTask.description.trim()
          }
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </Box>
    </Card>
  );
}
