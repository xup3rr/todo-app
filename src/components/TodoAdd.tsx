import { useAtom } from "jotai";
import { PlusIcon } from "./Icons";
import { NewTodoAtom } from "../store/TodoStore";
import clsx from "clsx";

const TodoAdd: React.FC = () => {
  const [todos, addTodo] = useAtom(NewTodoAtom);

  const disabled = todos[todos.length - 1].task.length === 0;

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
