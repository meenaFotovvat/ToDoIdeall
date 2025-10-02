import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchTasks } from "../features/tasks/taskSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AddTaskDialog from "../features/tasks/components/AddTaskDialog";

export default function TopBar() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] =
    useState("");
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] =
    useState(false);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchTasks({
          page: 1,
          limit: 10,
          search: searchTerm,
        })
      );
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [dispatch, searchTerm]);

  return (
    <div className="flex gap-3 flex-col sm:flex-row items-center mb-4 p-3 bg-gray-100 rounded-md">
      {/* Search */}
      <TextField
        size="small"
        label="Search"
        variant="outlined"
        className="w-full sm:w-1/2"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e?.target?.value)
        }
      />

      {/* Filter (optional) */}
      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="w-full sm:w-1/4"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="pending">
          Pending
        </MenuItem>
        <MenuItem value="completed">
          Completed
        </MenuItem>
      </TextField>

      {/* Add Task Button */}
      <Button
        variant="contained"
        color="primary"
        className="w-full sm:w-auto"
        onClick={() => setOpenDialog(true)}
      >
        + Add Task
      </Button>

      <AddTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </div>
  );
}
