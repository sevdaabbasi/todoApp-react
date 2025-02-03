import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoCard from "../components/TodoCard";
import TodoFilters from "../components/TodoFilters";
import { Todo, TodoStatus } from "../types/todo";

// Geçici mock data
const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Write and submit the project proposal for the new client",
    deadline: "2024-03-20",
    status: "TODO",
  },
  {
    id: "2",
    title: "Review Code",
    description: "Review pull requests and merge approved changes",
    deadline: "2024-03-15",
    status: "IN_PROGRESS",
  },
  // Daha fazla todo eklenebilir
];

function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TodoStatus | "ALL">("ALL");

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    // Edit modal/form açılacak
    console.log("Edit todo:", todo);
  };

  const handleStatusChange = (id: string, status: TodoStatus) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || todo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Todo List
        </h1>

        <TodoFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoCard
                          todo={todo}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onStatusChange={handleStatusChange}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default TodoScreen;
