import React, { useState } from "react";
import { Todo, TodoStatus } from "../types/todo";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaChevronDown } from "react-icons/fa";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}

function TodoCard({ todo, onDelete, onEdit, onStatusChange }: TodoCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case "TODO":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "DONE":
        return "bg-green-100 text-green-800";
    }
  };

  const statusOptions: TodoStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowStatusDropdown((prev) => !prev);
  };

  const handleStatusChange = (status: TodoStatus) => {
    onStatusChange(todo.id, status);
    setShowStatusDropdown(false);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 h-full flex items-center gap-2 px-4 z-20"
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="touch-pan-x relative"
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) {
            setIsRevealed(true);
          } else {
            setIsRevealed(false);
          }
        }}
      >
        <div
          className={`bg-white border border-gray-200 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all transform ${
            isRevealed ? "translate-x-[-100px]" : "translate-x-0"
          }`}
        >
          <div className="flex justify-between items-start relative">
            <div className="text-xl font-semibold text-gray-800">
              {todo.title}
            </div>
            <div className="relative">
              <button
                ref={buttonRef}
                type="button"
                onClick={handleStatusClick}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  todo.status
                )} flex items-center gap-2 hover:opacity-80 transition-opacity relative z-30`}
              >
                <span className="min-w-[80px] text-center">{todo.status}</span>
                <FaChevronDown
                  className={`transition-transform ${
                    showStatusDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {showStatusDropdown && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="fixed mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-1"
                    style={{
                      zIndex: 1000,
                      top: buttonRef.current?.getBoundingClientRect().bottom,
                      left: buttonRef.current?.getBoundingClientRect().left,
                    }}
                  >
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(status)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          status === todo.status ? "bg-gray-50" : ""
                        }`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full ${getStatusColor(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-2 text-gray-600">{todo.description}</div>
          <div className="h-0 border-t border-gray-200 my-3"></div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Deadline: {new Date(todo.deadline).toLocaleDateString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TodoCard;
