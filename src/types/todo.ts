export type TodoStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: TodoStatus;
}
