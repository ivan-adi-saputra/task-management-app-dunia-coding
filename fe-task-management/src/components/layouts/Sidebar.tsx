"use client";

import { NextPage } from "next";
import Link from "next/link";
import { LuClipboardList } from "react-icons/lu";

interface Props {}

const navLists = [
  {
    title: "Task",
    url: "/",
    icon: <LuClipboardList className="w-5 h-5 mr-3" />,
  },
];

const Sidebar: NextPage<Props> = ({}) => {
  return (
    <aside className="sidebar w-64 flex-shrink-0 hidden md:block transition-all duration-300">
      <div className="p-6 border-b border-gray-200 flex items-center">
        <span className="text-xl font-bold text-green-600">
          Task Management
        </span>
      </div>
      <nav className="p-4 space-y-2">
        {navLists.map((nav, index) => (
          <Link
            key={index}
            href={nav.url}
            className="flex items-center p-3 text-green-600 bg-green-200 hover:bg-green-300 hover:text-green-700 rounded-lg"
          >
            {nav.icon}
            {nav.title}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-200">
        <div className="flex items-center p-2 rounded-lg bg-gray-50">
          <div>
            <p className="font-semibold text-sm text-gray-800">
              Ivan Adi Saputra
            </p>
            <p className="text-xs text-gray-500">Fullstack Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
