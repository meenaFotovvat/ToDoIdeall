import type {
  TaskQueryParams,
  TaskCreateDTO,
} from "../types/taskTypes";
import { api } from "./axios";

export const fetchTasks = (
  query: TaskQueryParams
) =>
  api.get(`/todos/get`, {
    params: query, // Axios will only include defined keys
  });

export const createTask = (data: TaskCreateDTO) =>
  api.post("todos/", data);

export const updateTask = (
  id: string,
  data: TaskCreateDTO
) => api.put(`todos/${id}`, data);

export const deleteTask = (id: string) =>
  api.delete(`todos/${id}`);

export const getTaskById = (id: string) =>
  api.get(`todos/${id}`);
