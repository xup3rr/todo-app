import { Provider } from "jotai";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";

function App() {
  return (
    <Provider>
      <div className="container my-4">
        <TodoList />
        <TodoAdd />
      </div>
    </Provider>
  );
}

export default App;
