"use client";

import { useTaskStore } from "@/store/taskStore";
import {
  StatusTask,
  Task,
  TaskFormData,
  taskSchema,
  TaskStatusOption,
} from "@/types/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown, MdOutlineDateRange } from "react-icons/md";
import { Bounce, toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultValue?: Task;
}

const EditTaskModal: NextPage<Props> = ({ isOpen, onClose, defaultValue }) => {
  if (!isOpen) return null;

  const { updateTask, success, resetSuccess, isLoading } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: defaultValue?.title,
      due_date: defaultValue?.due_date,
      status: defaultValue?.status,
      description: defaultValue?.description,
    },
  });

  const onSubmit = (data: TaskFormData) => {
    const payload: Omit<Task, "id"> = {
      ...data,
      due_date: data.due_date,
      description: data.description || "",
      status: data.status as StatusTask,
    };
    updateTask(defaultValue!.id, payload);
  };

  useEffect(() => {
    if (success) {
      toast.success("Update task successfully", {
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
      onClose();
      resetSuccess();
    }
  }, [success, onClose, resetSuccess]);

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="modal-card bg-white w-full rounded-xl shadow-2xl flex flex-col max-h-[90vh] max-w-lg lg:max-w-xl overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>
            <p className="text-sm text-gray-500 mt-1">
              Update your task details and keep everything on track.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 p-1 -mr-2 rounded-full transition"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>

        <form
          className="flex flex-col flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="icon absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
          </div>

          <div className="p-6 sm:p-8 border-t border-gray-100 flex justify-end space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 cursor-pointer font-semibold rounded-lg hover:bg-gray-50 transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500"
              } text-white font-semibold rounded-lg shadow-lg cursor-pointer transition duration-150`}
            >
              {isLoading ? "Loading..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
