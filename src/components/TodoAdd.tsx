import { useAtom } from "jotai";
import { PlusIcon } from "./Icons";
import { NewTodoAtom } from "../store/TodoStore";
import clsx from "clsx";
import { useEffect } from "react";

const TodoAdd: React.FC = () => {
  const [todos, addTodo] = useAtom(NewTodoAtom);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addNewTodo = () => {
    if (todos[todos.length - 1].task.length > 0) {
      addTodo({
        id: crypto.randomUUID(),
        task: "",
        done: false,
      });
    }
  };

  return (
    <button
      className={clsx({ "opacity-50": disabled })}
      onClick={addNewTodo}
      disabled={disabled}
    >
      <PlusIcon />
    </button>
  );
};

export default TodoAdd;
