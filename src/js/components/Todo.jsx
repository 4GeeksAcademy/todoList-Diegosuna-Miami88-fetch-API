import React, { useState } from "react";

export const Todo = ({ todoValue, dateValue, isCompleted, setTodos, todos, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const deleteTodos = () => {
    console.log("Todo to be deleted: ", index);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = () => {
    const newTodos = [...todos]; // fucntion added to mark taskas done or undone by clicking the checkbox we create a copy of the todos array then we toggle the completed property of the specific task and then we update the state with the new array
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div
      className="border border-secondary p-2 bg-secondary text-white w-50 mx-auto my-2 d-flex justify-content-between align-items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="d-flex align-items-center gap-3">
        <input 
          type="checkbox" //check box function 
          checked={isCompleted} 
          onChange={toggleComplete} 
          style={{ cursor: "pointer", width: "20px", height: "20px" }}
        />
        <div className="text-start">
          <h1 style={{ 
            fontSize: "1.5rem", 
            margin: 0, 
            textDecoration: isCompleted ? "line-through" : "none",
            opacity: isCompleted ? 0.5 : 1
          }}>
            {todoValue}
          </h1>
          {dateValue && <small className="text-info">Due: {dateValue}</small>}
        </div>
      </div>
      <div className="col-1">
        {isHovered ? (
          <span className="text-danger" onClick={() => deleteTodos()} style={{cursor: "pointer", fontWeight: "bold"}}>
            x
          </span>
        ) : null}
      </div>
    </div>
  );
};
