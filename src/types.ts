export interface Todo {
  id: ReturnType<typeof crypto.randomUUID>;
  task: string;
  done: boolean;
}
