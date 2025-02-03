import React from "react";
import { FiPlus } from "react-icons/fi";

interface AddTodoButtonProps {
  onClick: () => void;
}

export default function AddTodoButton({ onClick }: AddTodoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      <FiPlus className="w-6 h-6" />
    </button>
  );
}
