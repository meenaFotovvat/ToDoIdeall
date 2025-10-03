import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../app/hooks";
import TopBar from "../components/TopBar";
import {
  fetchTasks,
  setLimit,
  setPage,
} from "../features/tasks/taskSlice";
import TaskList from "../features/tasks/components/TaskList";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
} from "@mui/material";

export default function Home() {
  const dispatch = useAppDispatch();
  const { tasks, loading, pagination, filters } =
    useAppSelector((state) => state?.task);

  useEffect(() => {
    dispatch(
      fetchTasks({
        page: pagination.page,
        limit: pagination.limit,
        title: filters.search, // title search
        sort: mapSortKey(filters.sortBy),
        order: filters.sortOrder,
        is_completed: filters.isCompleted,
      })
    );
  }, [
    dispatch,
    pagination.page,
    pagination.limit,
    filters.search,
    filters.sortBy,
    filters.sortOrder,
    filters.isCompleted,
  ]);

  const mapSortKey = (key: string) => {
    if (
      key === "createdAt" ||
      key === "updatedAt"
    )
      return key;
    if (
      key === "title" ||
      key === "description" ||
      key === "start_date" ||
      key === "end_date" ||
      key === "is_completed"
    )
      return key;
    return "createdAt";
  };

  const handlePageChange = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    page: number
  ) => {
    dispatch(setPage(page));
  };

  return (
    <div className="m-[75px]">
      <TopBar />
      {loading && <p>Loading...</p>}
      <Box>
        <div />
        <div className="flex items-center gap-4">
          <FormControl size="small">
            <InputLabel id="limit-label">
              Per Page
            </InputLabel>
            <Select
              labelId="limit-label"
              label="Per Page"
              value={pagination.limit}
              onChange={(e) =>
                (async () => {
                  dispatch(setPage(1));
                  dispatch(
                    setLimit(
                      Number(e.target.value)
                    )
                  );
                })()
              }
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <TaskList tasks={tasks} />
      <div className="flex justify-center mt-6">
        <Pagination
          color="primary"
          page={pagination.page}
          count={Math.max(
            1,
            pagination.totalPages ||
              Math.ceil(
                (pagination.total ||
                  tasks.length) / pagination.limit
              )
          )}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
