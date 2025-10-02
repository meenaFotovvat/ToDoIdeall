// API-facing shapes (match the backend data)
export interface TaskCreateDTO {
  id?: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_completed?: boolean;
}

export type SortOrder = "asc" | "desc";

export interface TaskQueryParams {
  page?: number;
  limit?: number;
  sort?:
    | "title"
    | "description"
    | "start_date"
    | "end_date"
    | "createdAt"
    | "updatedAt"
    | "is_completed";
  order?: SortOrder;
  description?: string;
  title?: string;
  is_completed?: boolean;
  start_date?: string;
  end_date?: string;
}

export interface TaskState {
  tasks: TaskCreateDTO[];
  selectedTask: TaskCreateDTO | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    isCompleted?: boolean;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
