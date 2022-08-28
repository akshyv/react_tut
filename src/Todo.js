import React from "react";
// import Draggable from "react-draggable";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  function handleDrag(e) {
    // console.log({ todo });
    // console.log(".........", e);
    e.dataTransfer.setData("text/plain", JSON.stringify(todo), e.pa);
    // e.dataTransfer.setData("text/plain", { todo }.id);
  }
  // handleDragOver = (event) => {
  //   event.stopPropogation();
  //   event.preventDefault();
  // };

  return (
    <div
      className="tasks"
      draggable
      onDragStart={(e) => {
        handleDrag(e);
      }}
      // onDragEnd={this.handleDragEnd}
    >
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
