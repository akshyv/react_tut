import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

const { v4: uuidv4 } = require("uuid");

const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Todo1", complete: true },
  ]);
  const todoNameRef = useRef(); //useRef is inbuilt hook

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos), [todos]);
  });

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    console.log(name);
  }
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add to do</button>
      <button onClick={handleClearTodos}>clear complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
      <div className="panelarea">
        <div id="to-do" className="panel">
          <h4>To-Do</h4>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <div id="on-process" className="panel">
          <h4>On-process</h4>
        </div>
        <div id="done" className="panel">
          <h4>Done</h4>
        </div>
      </div>
    </>
  );
}

export default App;
