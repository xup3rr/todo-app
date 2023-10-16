import { PrimitiveAtom, useAtom } from "jotai";
import { TodosAtoms } from "../store/TodoStore";
import { Todo } from "../types";
import TodoItem from "../components/TodoItem";

const TodoList: React.FC = () => {
  const [todos, dispatch] = useAtom(TodosAtoms);

  const removeTodo = (todoAtom: PrimitiveAtom<Todo>) => {
    if (todos.length > 1) dispatch({ type: "remove", atom: todoAtom });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          deleteTodo={() => removeTodo(todo)}
          key={todo.toString()}
        />
      ))}
    </ul>
  );
};

export default TodoList;
