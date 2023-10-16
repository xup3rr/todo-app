import { Provider } from "jotai";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";

function App() {
  return (
    <Provider>
      <div className="container p-4 mb-36">
        <TodoList />
        <TodoAdd />
      </div>
    </Provider>
  );
}

export default App;
