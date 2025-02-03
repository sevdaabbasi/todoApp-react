import React from "react";
import { TodoStatus } from "../types/todo";

interface TodoFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: TodoStatus | "ALL";
  setStatusFilter: (status: TodoStatus | "ALL") => void;
}

function TodoFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: TodoFiltersProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as TodoStatus | "ALL")
          }
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="ALL">All</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>
    </div>
  );
}

export default TodoFilters;
