import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  TaskCreateDTO,
  TaskQueryParams,
} from "../../types/taskTypes";
import { api } from "../../api/axios";

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
      const response = await api.delete(
        `/todos/${id}`
      );
      return response;
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
