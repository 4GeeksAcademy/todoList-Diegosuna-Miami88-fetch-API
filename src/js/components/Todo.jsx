import React, { useState } from "react";

export const Todo = ({
  todoValue,
  dateValue,
  isCompleted,
  setTodos,
  todos,
  index,
  deleteTodos,
  id,
  getTodos,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleComplete = async () => {
    const task = todos[index];
    const newStatus = !task.is_done;

    const newTodos = [...todos];
    newTodos[index] = { ...task, is_done: newStatus };
    setTodos(newTodos);

    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "PUT", // Updated from GET because logic sends a body
        body: JSON.stringify({ label: task.label, is_done: newStatus }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error syncing checkbox:", error);
    }
  };

  

  return (
    <div
      className="border border-secondary p-2 bg-secondary text-white w-50 mx-auto my-2 d-flex justify-content-between align-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="d-flex align-items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={toggleComplete}
          style={{ cursor: "pointer", width: "20px", height: "20px" }}
        />
        <div className="text-start">
          <h1
            style={{
              fontSize: "1.5rem",
              margin: 0,
              textDecoration: isCompleted ? "line-through" : "none",
              opacity: isCompleted ? 0.5 : 1,
            }}
          >
            {todoValue}
          </h1>
          {dateValue && <small className="text-info">Due: {dateValue}</small>}
        </div>
      </div>
      <div className="col-1">
        {isHovered && (
          <span onClick={() => deleteTodos(id)}>X</span>
        )}
      </div>
    </div>
  );
};
