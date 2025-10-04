"use client";

import {
  StatusTask,
  Task,
  TaskFormData,
  taskSchema,
  TaskStatusOption,
} from "@/types/task";
import { NextPage } from "next";
import { MdKeyboardArrowDown, MdOutlineDateRange } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskStore } from "@/store/taskStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

interface Props {}

const AddPage: NextPage<Props> = ({}) => {
  const { addTask, success, resetSuccess, isLoading } = useTaskStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: StatusTask.InProgress,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    const payload: Omit<Task, "id"> = {
      ...data,
      due_date: data.due_date,
      description: data.description || "",
      status: data.status as StatusTask,
    };
    addTask(payload);
  };

  useEffect(() => {
    if (success) {
      toast.success("Create new task successfully", {
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
      router.push("/");
      resetSuccess();
    }
  }, [success, router, resetSuccess]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Task</h1>

          <div className="bg-white rounded-lg shadow-md p-6 lg:p-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-item">
                <label
                  htmlFor="form-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="form-title"
                  {...register("title")}
                  placeholder="Implement authentication"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="form-item">
                <label
                  htmlFor="form-due-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date <span className="text-red-700">*</span>
                </label>
                <div className="relative input-group">
                  <input
                    type="date"
                    id="form-due-date"
                    {...register("due_date")}
                    className="w-full p-3 border border-gray-300 rounded-lg pr-10 text-gray-500 focus:ring-green-500 focus:border-green-500 transition duration-150 custom-date-input"
                  />
                  <div className="icon">
                    <MdOutlineDateRange className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                {errors.due_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.due_date.message}
                  </p>
                )}
              </div>

              <div className="form-item">
                <label
                  htmlFor="form-status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <div className="relative">
                  <select
                    id="form-status"
                    {...register("status")}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10 focus:ring-green-500 focus:border-green-500 transition duration-150"
                  >
                    {TaskStatusOption.map((status, index) => (
                      <option key={index} value={status.value}>
                        {status.title}
                      </option>
                    ))}
                  </select>
                  <div className="icon absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <MdKeyboardArrowDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="form-item">
                <label
                  htmlFor="form-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="form-description"
                  {...register("description")}
                  placeholder="Setup JWT-based authentication and middleware in Gin"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                ></textarea>
              </div>

              <button
                type="submit"
                className={`px-6 py-3 cursor-pointer ${
                  isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } text-white rounded-lg transition duration-150`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Save Task"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
