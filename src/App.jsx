import "./App.css";
import BoxList from "./components/boxes/BoxList";
import TodoList from "./components/todos/TodoList";

const App = () => {
  return (
    <main className="app">
      <header className="app-header">
        <h1>React Forms Project</h1>
      </header>

      <div className="panels">
        <BoxList />
        <TodoList />
      </div>
    </main>
  );
};

export default App;
