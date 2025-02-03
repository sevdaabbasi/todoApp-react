import React, { useState } from "react";
import { Todo } from "../types/todo";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onStatusChange: (id: string, status: Todo["status"]) => void;
}

function TodoCard({ todo, onDelete, onEdit, onStatusChange }: TodoCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const getStatusColor = (status: Todo["status"]) => {
    switch (status) {
      case "TODO":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "DONE":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <motion.div
      layout
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -100) {
          setIsRevealed(true);
        } else {
          setIsRevealed(false);
        }
      }}
      className="relative"
    >
      <div
        className={`absolute right-0 top-0 h-full flex items-center gap-2 px-4 ${
          isRevealed ? "z-10" : "z-0"
        }`}
      >
        <button
          onClick={() => onEdit(todo)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <FaTrash />
        </button>
      </div>

      <motion.div
        animate={{ x: isRevealed ? -100 : 0 }}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-between items-start">
          <div className="text-xl font-semibold text-gray-800">
            {todo.title}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              todo.status
            )}`}
          >
            {todo.status}
          </span>
        </div>
        <div className="mt-2 text-gray-600">{todo.description}</div>
        <div className="h-0 border-t border-gray-200 my-3"></div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Deadline: {new Date(todo.deadline).toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TodoCard;
