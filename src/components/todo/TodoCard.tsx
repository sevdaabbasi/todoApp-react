import React, { useState } from "react";
import { motion } from "framer-motion";
import { Todo, TodoStatus } from "../../types/todo";
import { FiMoreVertical, FiCalendar, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Menu } from "@headlessui/react";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

export default function TodoCard({
  todo,
  onDelete,
  onEdit,
  onStatusChange,
}: TodoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case "TODO":
        return "bg-red-100 text-red-800 border-red-200";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DONE":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const statusOptions: TodoStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div
        className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all ${
          isHovered ? "border-purple-200" : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {todo.title}
            </h3>
            <p className="text-gray-600 mb-4">{todo.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500 text-sm">
                <FiCalendar className="w-4 h-4 mr-1" />
                {new Date(todo.deadline).toLocaleDateString()}
              </div>
              <select
                value={todo.status}
                onChange={(e) =>
                  onStatusChange(todo.id, e.target.value as TodoStatus)
                }
                className={`text-sm px-3 py-1 rounded-full border ${getStatusColor(
                  todo.status
                )}`}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Menu as="div" className="relative">
            <Menu.Button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FiMoreVertical className="w-5 h-5 text-gray-500" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onEdit(todo)}
                    className={`${
                      active ? "bg-gray-50" : ""
                    } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    <FiEdit2 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(todo.id)}
                    className={`${
                      active ? "bg-gray-50" : ""
                    } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                  >
                    <FiTrash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </motion.div>
  );
}
