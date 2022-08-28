import React from "react";
// import Draggable from "react-draggable";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }
  function handleDrag() {
    console.log("drag initiated");
    // event.dataTransfer.setData("text/plain", event.target.id);
  }

  return (
    <div className="tasks" draggable onDragStart={handleDrag}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </label>
    </div>
  );
}
