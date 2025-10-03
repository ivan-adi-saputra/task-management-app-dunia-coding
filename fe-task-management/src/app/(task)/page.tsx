"use client";

import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

const tableHeaders = [
  "No",
  "Title",
  "Due Date",
  "Description",
  "Status",
  "Action",
];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          <button className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150">
            <IoMdAdd className="w-5 h-5 mr-2" />
            New Task
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  1.
                </td>
                <td className="px-4 py-3 flex items-center whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">
                    Setup project structure
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  19 July, 2025
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 font-medium">
                  Initialize Go project with modules, folders, and basic
                  dependencies
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    completed
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-gray-400 hover:text-yellow-600 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                    <TbEdit className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                    <RiDeleteBin6Line className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
