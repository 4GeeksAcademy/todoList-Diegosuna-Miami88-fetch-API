import React from "react";

export const Todo = ({ todoValue, setTodos, todos, index }) => {
    const deleteTodos = () => {
        console.log("Todo to be deleted: ", index)
        const newTodos = [...todos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }
  return (
    <div className="border border-secondary p-2 bg-secondary text-white w-50 mx-auto my-2">
      <h1>{todoValue}</h1>

      <div className="col-3">
        <button className="text-danger" onClick={deleteTodos}>
        {/* add .hover event for completed task, be able to edit the task! */}
          x
        </button>
      </div>
    </div>
  );
};
