import { PrimitiveAtom, useAtom } from "jotai";
import { useRef } from "react";
import TodoItem, { TodoRef } from "../components/TodoItem";
import { TodosAtoms } from "../store/TodoStore";
import { Todo } from "../types";

const TodoList: React.FC = () => {
  const [todos, dispatch] = useAtom(TodosAtoms);
  const todosRef = useRef<Array<TodoRef | null>>([]);

  const deleteTodo = (todoAtom: PrimitiveAtom<Todo>) => {
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
          deleteTodo={() => deleteTodo(todo)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
