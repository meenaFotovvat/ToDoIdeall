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
  reducers: {},
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
          (task) => task?.id === action.payload.id
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
          (task) => task?.id !== action.payload
        );
      }
    );
  },
});

export default taskSlice.reducer;
