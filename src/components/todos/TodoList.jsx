import { useCallback, useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const createId = useCallback(
    () =>
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    []
  );

  const addTodo = (task) => {
    const nextTodo = { id: createId(), task };
    setTodos((current) => [...current, nextTodo]);
  };

  const removeTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const saveTodo = (id, task) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, task } : todo))
    );
  };

  return (
    <section className="panel todo-panel" aria-label="Todo manager">
      <header>
        <h2>Todo List</h2>
        <p>Track tasks, edit them, and remove what&apos;s done.</p>
      </header>
      <NewTodoForm addTodo={addTodo} />

      {todos.length === 0 ? (
        <p className="empty-state">No todos yet, add your first one above.</p>
      ) : (
        <ul className="todo-list" aria-live="polite">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              {...todo}
              onRemove={removeTodo}
              onSave={saveTodo}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TodoList;
