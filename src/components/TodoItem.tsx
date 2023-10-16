import {
  ChangeEvent,
  ElementRef,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { Todo } from "../types";
import { PrimitiveAtom, useAtom } from "jotai";
import { CheckCircleIcon, CheckCircleIconSolid, TrashIcon } from "./Icons";
import clsx from "clsx";

interface TodoProps {
  todo: PrimitiveAtom<Todo>;
  deleteTodo: () => void;
}

const TodoItem: React.FC<TodoProps> = ({ todo: PrimitiveAtom, deleteTodo }) => {
  const [todo, setTodo] = useAtom(PrimitiveAtom);
  const [shouldDelete, setShouldDelete] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);

  const toggleTodo = () => {
    setTodo((prev) => ({ ...prev, done: prev.task.length > 0 && !prev.done }));
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo((old) => ({
      ...old,
      task: event.target.value,
      done: event.target.value.length === 0 ? false : old.done,
    }));
    setShouldDelete(event.target.value.length === 0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && shouldDelete) {
      setShouldDelete(false);
      deleteTodo();
    }
  };

  return (
    <li className="flex gap-x-4 items-center my-4 border-b-2 border-transparent focus-within:border-slate-300 group pb-1 hover">
      <button onClick={toggleTodo}>
        {todo.done ? <CheckCircleIconSolid /> : <CheckCircleIcon />}
      </button>
      <input
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={todo.task}
        disabled={todo.done}
        className={clsx("outline-none bg-transparent flex-1 transition-all", {
          "text-slate-400 line-through": todo.done,
        })}
      />
      <button
        onClick={deleteTodo}
        className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default TodoItem;
