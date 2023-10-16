import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { NewRandomTodoAtom, NewTodoAtom } from "../store/TodoStore";
import { CloudIcon, PlusIcon, StarIcon } from "./Icons";

const TodoAdd: React.FC = () => {
  const [todos, addTodo] = useAtom(NewTodoAtom);
  const [loading, addRandomTodo] = useAtom(NewRandomTodoAtom);

  const disabled = todos[todos.length - 1].task.length === 0;

  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addNewTodo();
      }
    };
    window.addEventListener("keypress", keyPressHandler);
    return () => {
      window.removeEventListener("keypress", keyPressHandler);
    };
  }, [todos]); // eslint-disable-line react-hooks/exhaustive-deps

  const addNewTodo = () => {
    if (!disabled) {
      addTodo({
        id: crypto.randomUUID(),
        task: "",
        done: false,
      });
    }
  };

  return (
    <div className="flex gap-x-2 py-2 sticky bottom-0">
      <button
        className={clsx({ "opacity-50": disabled })}
        onClick={addNewTodo}
        disabled={disabled}
      >
        <PlusIcon />
      </button>
      <button
        className={clsx({ "opacity-50": disabled })}
        onClick={addRandomTodo}
        disabled={disabled}
      >
        {loading ? <CloudIcon /> : <StarIcon />}
      </button>
    </div>
  );
};

export default TodoAdd;
