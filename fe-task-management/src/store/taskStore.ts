import api from "@/services/api";
import { ApiResponse } from "@/types/api";
import { Task, TaskState } from "@/types/task";
import { handleError } from "@/utils/error";
import { Bounce, toast } from "react-toastify";
import { create } from "zustand";

const TASK_ENDPOINT = "/api/v1/task/";

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  getTasks: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<ApiResponse<Task[]>>(TASK_ENDPOINT, {
        params,
      });
      set({ tasks: response.data.data });
    } catch (err) {
      const errMessage = handleError(err);
      toast.error(errMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      set({ error: errMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (taskPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<Task>>(
        TASK_ENDPOINT,
        taskPayload
      );
      set((state) => ({
        tasks: [...state.tasks, response.data.data],
      }));
    } catch (err) {
      const errMessage = handleError(err);
      toast.error(errMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      set({ error: errMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete<ApiResponse<Task>>(`${TASK_ENDPOINT}${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (err) {
      const errMessage = handleError(err);
      toast.error(errMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      set({ error: errMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTask: async (id, taskPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put<ApiResponse<Task>>(
        `${TASK_ENDPOINT}/${id}/`,
        taskPayload
      );

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? response.data.data : task
        ),
      }));
    } catch (err) {
      const errMessage = handleError(err);
      toast.error(errMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      set({ error: errMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  changeStatusTask: async (id, status) => {
    set({ isLoading: true, error: null });

    const previousTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: status } : task
      ),
    }));

    try {
      const response = await api.put<ApiResponse<Task>>(
        `${TASK_ENDPOINT}change-status/${id}/`,
        {
          status,
        }
      );

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? response.data.data : task
        ),
      }));
    } catch (err) {
      const errMessage = handleError(err);
      toast.error(errMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      set({ error: errMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
