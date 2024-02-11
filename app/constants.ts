export type TaskTypes = "added" | "started" | "completed";
export type Task = {
  id: number;
  content: string;
};
export type Column = {
  id: TaskTypes;
  name: string;
};
export type Columns = Record<TaskTypes, Column>;
export const COLUMNS: Columns = {
  added: { id: "added", name: "Added" },
  started: { id: "started", name: "Started" },
  completed: { id: "completed", name: "Completed" },
};

export const STORAGE_KEY = "tasks_list";
