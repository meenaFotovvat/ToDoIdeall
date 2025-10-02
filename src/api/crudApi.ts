import type {
  TaskQueryParams,
  TaskCreateDTO,
} from "../types/taskTypes";
import { api } from "./axios";

export const fetchTasks = (
  query: TaskQueryParams
) =>
  api.get(
    `/todos/get?page=${query.page}&limit=${query.limit}&sort=${query.sort}&order=${query.order}&title=${query.title}&description=${query.description}&is_completed=${query.is_completed}&start_date=${query.start_date}&end_date=${query.end_date}`
  );

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
