import React, { useState } from "react";
import "./TodoList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleToggleAllTodos = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !todos.every((t) => t.completed),
    }));
    setTodos(updatedTodos);
  };

  const handleDeleteCompletedTodos = () => {
    const filteredTodos = todos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
      </div>
      <div className="button-group">
        <button
          className="btn btn-success"
          type="button"
          onClick={handleToggleAllTodos}
        >
          {todos.every((todo) => todo.completed)
            ? "Mark all incomplete"
            : "Mark all complete"}
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleDeleteCompletedTodos}
        >
          Delete completed tasks
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item ${todo.completed ? "completed" : ""}`}
            onClick={() => handleToggleTodo(todo.id)}
          >
            <span className="todo-text">{todo.text}</span>
            <button
              className="btn btn-danger btn-sm float-right"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(todo.id);
              }}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <div className="image-group">
        <img src="https://picsum.photos/200" alt="Image 1" />
        <img src="https://picsum.photos/200" alt="Image 2" />
        <img src="https://picsum.photos/200" alt="Image 3" />
      </div>
    </div>
  );
}

export default TodoList;
