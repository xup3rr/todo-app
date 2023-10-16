import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import { Todo } from "../types";

const initialState: Array<Todo> = [
  {
    id: crypto.randomUUID(),
    task: "Add todos",
    done: false,
  },
];

// Save an array of Todos in local storage
const Todos = atomWithStorage<Array<Todo>>("todos", initialState);

// Get each todo like an atom        // Key extractor
const TodosAtoms = splitAtom(Todos, (todo) => todo.id);

// Add a new todo
const NewTodoAtom = atom(
  (get) => get(Todos),
  (get, set, newTodo: Todo) => {
    set(Todos, [...get(Todos), newTodo]);
  }
);

export { TodosAtoms, NewTodoAtom };
