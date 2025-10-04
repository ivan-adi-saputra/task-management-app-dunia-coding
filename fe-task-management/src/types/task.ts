import z from "zod";

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
  success: boolean | null;

  getTasks: (param?: TaskParams) => Promise<void>;
  addTask: (payload: Omit<Task, "id">) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, payload: Omit<Task, "id">) => Promise<void>;
  changeStatusTask: (id: string, status: StatusTask) => Promise<void>;
  resetSuccess: () => void;
}

export const taskSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" }),
  due_date: z
    .string()
    .nonempty({ message: "Due Date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  description: z.string().optional(),
  status: z.nativeEnum(StatusTask).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const TaskStatusOption = [
  { value: StatusTask.Pending, title: "Pending" },
  { value: StatusTask.InProgress, title: "In Progress" },
  { value: StatusTask.Completed, title: "Completed" },
];
