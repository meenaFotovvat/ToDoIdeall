/* eslint-disable */

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  TaskCreateDTO,
  TaskQueryParams,
  TaskState,
} from "../../types/taskTypes";
import { api } from "../../api/axios";

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
};

// ------------------- Async Thunks -------------------

// Fetch tasks with query params
export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (
    query: TaskQueryParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        "/todos/get",
        { params: query }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create new task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (
    task: TaskCreateDTO,
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        "/todos/",
        task
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: Partial<TaskCreateDTO>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/todos/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get task by id
export const getTaskById = createAsyncThunk(
  "taskk/getTaskById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/todos/${id}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ------------------- Slice -------------------
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.pagination.page = action.payload;
    },
    setLimit: (
      state,
      action: PayloadAction<number>
    ) => {
      state.pagination.limit = action.payload;
    },
    setSearch: (
      state,
      action: PayloadAction<string>
    ) => {
      state.filters.search = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<string>
    ) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (
      state,
      action: PayloadAction<"asc" | "desc">
    ) => {
      state.filters.sortOrder = action.payload;
    },
    setIsCompleted: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.filters.isCompleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(
      fetchTasks.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.tasks =
          action.payload.data || action.payload;
        const payload = action.payload;

        // Handle API response format: {data: [], meta: {...}}
        if (payload?.data) {
          state.tasks = payload.data;
          const meta = payload.meta;
          if (meta) {
            state.pagination.page =
              meta.page ?? state.pagination.page;
            state.pagination.limit =
              meta.limit ??
              state.pagination.limit;
            state.pagination.total =
              meta.total ??
              state.pagination.total;
            state.pagination.totalPages =
              meta.totalPages ??
              state.pagination.totalPages;
            state.pagination.hasNextPage =
              meta.hasNextPage ??
              state.pagination.hasNextPage;
            state.pagination.hasPrevPage =
              meta.hasPrevPage ??
              state.pagination.hasPrevPage;
          }
        } else if (Array.isArray(payload)) {
          // Fallback for array responses
          state.tasks = payload;
        } else {
          state.tasks = [];
        }
      }
    );
    builder.addCase(
      fetchTasks.rejected,
      (state, action: any) => {
        state.loading = false;
        state.error =
          action.payload ||
          "Failed to fetch tasks";
      }
    );

    // Update
    builder.addCase(
      updateTask.fulfilled,
      (
        state,
        action: PayloadAction<TaskCreateDTO>
      ) => {
        const index = state.tasks.findIndex(
          (task) =>
            task?._id === action.payload._id
        );
        if (index !== -1)
          state.tasks[index] = action.payload;
      }
    );

    // Delete
    builder.addCase(
      deleteTask.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(
          (task) => task?._id !== action.payload
        );
      }
    );
  },
});

export default taskSlice.reducer;
export const {
  setPage,
  setLimit,
  setSearch,
  setSortBy,
  setSortOrder,
  setIsCompleted,
} = taskSlice.actions;
