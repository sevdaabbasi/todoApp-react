import React from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Todo, TodoStatus } from "../../types/todo";
import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
}

function SortableTodoItem({
  todo,
  onDelete,
  onEdit,
  onStatusChange,
}: {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onStatusChange: (id: string, status: TodoStatus) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TodoCard
        todo={todo}
        onDelete={onDelete}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}

export default function TodoList({
  todos,
  onDelete,
  onEdit,
  onStatusChange,
  onReorder,
}: TodoListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {todos.map((todo) => (
            <SortableTodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
