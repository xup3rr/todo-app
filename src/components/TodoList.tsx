import { PrimitiveAtom, useAtom } from "jotai";
import { TodosAtoms } from "../store/TodoStore";
import { Todo } from "../types";
import TodoItem, { TodoRef } from "../components/TodoItem";
import { useRef } from "react";

const TodoList: React.FC = () => {
  const [todos, dispatch] = useAtom(TodosAtoms);
  const todosRef = useRef<Array<TodoRef | null>>([]);

  const removeTodo = (todoAtom: PrimitiveAtom<Todo>) => {
    if (todos.length > 1) dispatch({ type: "remove", atom: todoAtom });
    todosRef.current?.[todos.length - 2]?.focus(); //focus the last todo input
  };

  return (
    <ul>
      {todos.map((todo, i) => (
        <TodoItem
          key={todo.toString()}
          ref={(el) => (todosRef.current[i] = el)}
          todo={todo}
          deleteTodo={() => removeTodo(todo)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
