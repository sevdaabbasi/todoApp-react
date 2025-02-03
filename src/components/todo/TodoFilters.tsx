import React from "react";
import { TodoStatus } from "../../types/todo";
import { FiSearch, FiFilter } from "react-icons/fi";

interface TodoFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: TodoStatus | "ALL";
  onStatusFilterChange: (status: TodoStatus | "ALL") => void;
}

export default function TodoFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search todos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value as TodoStatus | "ALL")
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="ALL">All</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
}
