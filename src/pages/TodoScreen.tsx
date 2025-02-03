import React, { useState } from "react";
import { Todo, TodoStatus } from "../types/todo";
import Header from "../components/layout/Header";
import TodoList from "../components/todo/TodoList";
import TodoFilters from "../components/todo/TodoFilters";
import TodoForm from "../components/todo/TodoForm";
import AddTodoButton from "../components/todo/AddTodoButton";
import { v4 as uuidv4 } from "uuid";

// Geçici mock data
const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Design New Landing Page",
    description:
      "Create a modern and responsive landing page design for the company website",
    deadline: "2024-03-25",
    status: "IN_PROGRESS",
  },
  {
    id: "2",
    title: "Update User Documentation",
    description: "Review and update the user documentation with new features",
    deadline: "2024-03-20",
    status: "TODO",
  },
  {
    id: "3",
    title: "Bug Fixes for Release",
    description: "Fix reported bugs before the next release",
    deadline: "2024-03-15",
    status: "DONE",
  },
];

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "ALL">("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

  const handleAddTodo = (data: Omit<Todo, "id">) => {
    const newTodo: Todo = {
      id: uuidv4(),
      ...data,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setIsFormOpen(false);
  };

  const handleEditTodo = (data: Omit<Todo, "id">) => {
    if (!editingTodo) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, ...data } : todo
      )
    );
    setEditingTodo(undefined);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleStatusChange = (id: string, status: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const handleReorder = (oldIndex: number, newIndex: number) => {
    setTodos((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || todo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <button
            onClick={() => {
              setEditingTodo(undefined);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add New Task
          </button>
        </div>

        <TodoFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <TodoList
          todos={filteredTodos}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
          onReorder={handleReorder}
        />

        <TodoForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(undefined);
          }}
          onSubmit={editingTodo ? handleEditTodo : handleAddTodo}
          todo={editingTodo}
        />

        <AddTodoButton
          onClick={() => {
            setEditingTodo(undefined);
            setIsFormOpen(true);
          }}
        />
      </main>
    </div>
  );
}
