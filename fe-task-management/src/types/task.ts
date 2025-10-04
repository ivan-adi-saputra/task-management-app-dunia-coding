export enum StatusTask {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

export interface Task {
  id: string;
  title: string;
  due_date: string;
  description: string;
  status: StatusTask;
}

export interface TaskParams {
  title?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  getTasks: (param?: TaskParams) => Promise<void>;
  addTask: (payload: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, payload: Task) => Promise<void>;
  changeStatusTask: (id: string, status: StatusTask) => Promise<void>;
}
