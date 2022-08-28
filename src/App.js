import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

const { v4: uuidv4 } = require("uuid");

const LOCAL_STORAGE_KEY = "todoApp.todos";
function App() {
  const [todos, setTodos] = useState([]);

  const [todos1, setTodos1] = useState([
    { id: uuidv4, name: "New Task2", complete: true },
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
    const newTodos1 = [...todos1];
    const todo1 = newTodos1.find((todo) => todo.id === id);
    todo1.complete = !todo1.complete;
    setTodos1(newTodos1);
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
    const newTodos1 = todos1.filter((todo) => !todo.complete);
    setTodos1(newTodos1);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e) {
    let source_state = JSON.parse(e.dataTransfer.getData("text/plain"));
    // let sourceIdEl = document.getElementById(sourceId);
    // let sourceIdParentEl = sourceIdEl.parentElement;
    // let targetEl = document.getElementById(e.target.id);
    // let targetParentEl = targetEl.parentElement;
    // console.log("drop eid: ", e.id, " eclasname:", e.className);
    handleAddTodo1(source_state);
    del_source_state(source_state);
    console.log(
      "target: ",
      e.target.id,
      " ,source_state: ",
      source_state,
      " ,sourceId: "
    );
  }

  function del_source_state(task) {
    console.log(task);
    let newTodos = todos.filter((titer) => titer.id !== task.id);
    setTodos(newTodos);
  }

  function handleAddTodo1(task) {
    setTodos1((prevTodos1) => {
      return [...prevTodos1, task];
    });
    console.log(task);
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
        <div
          id="on-process"
          className="panel"
          onDragOver={(e) => {
            onDragOver(e);
          }}
          onDrop={(e) => {
            onDrop(e);
          }}
        >
          <h4>On-process</h4>
          <TodoList todos={todos1} toggleTodo={toggleTodo} />
        </div>
        <div id="done" className="panel">
          <h4>Done</h4>
        </div>
      </div>
    </>
  );
}

export default App;
