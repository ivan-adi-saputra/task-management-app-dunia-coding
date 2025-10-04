"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useTaskStore } from "@/store/taskStore";
import { StatusTask, Task, TaskStatusOption } from "@/types/task";
import { formatDate } from "@/utils/date";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import Link from "next/link";
import EditTaskModal from "@/components/modal/EditTaskModal";
import { Bounce, toast } from "react-toastify";
import { FaExchangeAlt } from "react-icons/fa";

const tableHeaders = [
  "No",
  "Title",
  "Due Date",
  "Description",
  "Status",
  "Action",
];

export default function Home() {
  const { tasks, isLoading, getTasks, changeStatusTask, deleteTask } =
    useTaskStore();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState<Task | undefined>(undefined);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getTasks({ title: debouncedSearchTerm });
  }, [getTasks, debouncedSearchTerm]);

  const handleDelete = (id: string) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this task?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteTask(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const editTask = (id: string) => {
    const task = tasks.find((task) => task.id == id);
    if (!task) {
      toast.error("Task not found", {
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
      return;
    }

    setDefaultValue(task);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDefaultValue(undefined);
  };

  const handleChangeStatusTask = (id: string) => {
    const task = tasks.find((task) => task.id == id);
    if (!task) {
      toast.error("Task not found", {
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
      return;
    }

    const options = TaskStatusOption.filter(
      (option) => option.value != task.status
    );

    confirmAlert({
      title: "Change Status",
      message: "Choose the new status for this task:",
      buttons: options.map((option) => ({
        label: option.title,
        onClick: () => changeStatusTask(id, option.value),
      })),
    });
  };

  const statusStyles: Record<StatusTask, string> = {
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <Link
            href={"/add"}
            className="flex items-center cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150"
          >
            <IoMdAdd className="w-5 h-5 mr-2" />
            New Task
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                onChange={handleSearchChange}
                value={searchTerm}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="table-header">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    className="px-4 py-3 text-center whitespace-nowrap text-sm text-gray-500"
                    colSpan={tableHeaders.length}
                  >
                    Loading...
                  </td>
                </tr>
              ) : tasks.length < 1 ? (
                <tr>
                  <td
                    className="px-4 py-3 text-center whitespace-nowrap text-sm text-gray-500"
                    colSpan={tableHeaders.length}
                  >
                    Task not found
                  </td>
                </tr>
              ) : (
                tasks?.map((task, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}.
                    </td>
                    <td className="px-4 py-3 flex items-center whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-800">
                        {task.title}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(task.due_date)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">
                      {task.description}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          statusStyles[task.status]
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        type="button"
                        onClick={() => handleChangeStatusTask(task.id)}
                        className="text-gray-400 hover:text-green-600 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                      >
                        <FaExchangeAlt className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => editTask(task.id)}
                        className="text-gray-400 hover:text-yellow-600 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                      >
                        <TbEdit className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(task.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                      >
                        <RiDeleteBin6Line className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <EditTaskModal
            onClose={handleCloseModal}
            defaultValue={defaultValue}
          />
        )}
      </main>
    </div>
  );
}
