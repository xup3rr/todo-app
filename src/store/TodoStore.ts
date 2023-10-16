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

const loadingAtom = atom<boolean>(false);
// Add a random todo
export const NewRandomTodoAtom = atom(
  (get) => get(loadingAtom),
  async (get, set) => {
    set(loadingAtom, true);
    try {
      //TODO: get random todo from chatgpt
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${Math.floor(
          Math.random() * 200
        )}`
      );

      const { title } = await response.json();
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        task: title,
        done: false,
      };
      set(Todos, [...get(Todos), newTodo]);
      set(loadingAtom, false);
    } catch (e) {
      console.error(e);
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        task: "Failed to fetch todo",
        done: true,
      };
      set(Todos, [...get(Todos), newTodo]);
      set(loadingAtom, false);
    }
  }
);

export { TodosAtoms, NewTodoAtom };
