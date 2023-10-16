import { Provider } from "jotai";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Provider>
      <div className="container my-4">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
