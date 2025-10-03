import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import {
  setIsCompleted,
  setPage,
  setSearch,
  setSortBy,
  setSortOrder,
} from "../features/tasks/taskSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import AddTaskDialog from "../features/tasks/components/AddTaskDialog";

export default function TopBar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(
    (s) => s.task
  );
  const [searchTerm, setSearchTerm] = useState(
    filters.search ?? ""
  );
  const [openDialog, setOpenDialog] =
    useState(false);
  const [completedFilter, setCompletedFilter] =
    useState<string>(
      filters.isCompleted === undefined
        ? "all"
        : filters.isCompleted
        ? "completed"
        : "active"
    );

  const handleSortByChange = (
    e: SelectChangeEvent
  ) => {
    dispatch(setSortBy(e.target.value as string));
    dispatch(setPage(1));
  };

  const handleSortOrderChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    value: "asc" | "desc" | null
  ) => {
    if (!value) return;
    dispatch(setSortOrder(value));
    dispatch(setPage(1));
  };

  const handleCompletedChange = (
    e: SelectChangeEvent
  ) => {
    const val = e.target.value;
    const mapped =
      val === "all"
        ? undefined
        : val === "completed";
    setCompletedFilter(val);
    dispatch(setIsCompleted(mapped));
    dispatch(setPage(1));
  };

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(searchTerm));
      dispatch(setPage(1));
    }, 400);
    return () => clearTimeout(handler);
  }, [
    dispatch,
    searchTerm,
    filters.sortBy,
    filters.sortOrder,
    completedFilter,
  ]);

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

      {/* Sort By */}
      <FormControl
        size="small"
        className="w-full sm:w-40"
      >
        <InputLabel id="sort-by-label">
          Sort By
        </InputLabel>
        <Select
          labelId="sort-by-label"
          label="Sort By"
          value={filters.sortBy}
          onChange={handleSortByChange}
        >
          <MenuItem value="createdAt">
            Created
          </MenuItem>
          <MenuItem value="updatedAt">
            Updated
          </MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="start_date">
            Start Date
          </MenuItem>
          <MenuItem value="end_date">
            End Date
          </MenuItem>
          <MenuItem value="is_completed">
            Completed
          </MenuItem>
        </Select>
      </FormControl>

      {/* Order */}
      <ToggleButtonGroup
        size="small"
        exclusive
        value={filters.sortOrder}
        onChange={handleSortOrderChange}
      >
        <ToggleButton value="asc">
          Asc
        </ToggleButton>
        <ToggleButton value="desc">
          Desc
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Completed Filter */}
      <FormControl
        size="small"
        className="w-full sm:w-40"
      >
        <InputLabel id="completed-filter-label">
          Status
        </InputLabel>
        <Select
          labelId="completed-filter-label"
          label="Status"
          value={completedFilter}
          onChange={handleCompletedChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">
            Active
          </MenuItem>
          <MenuItem value="completed">
            Completed
          </MenuItem>
        </Select>
      </FormControl>

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
