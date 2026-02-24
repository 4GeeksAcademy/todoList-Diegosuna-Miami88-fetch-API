import React, { useState, useEffect } from "react";
import { Todo } from "./Todo.jsx";
import { Footer } from "./Footer.jsx";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [todos, setTodos] = useState([]);
  const username = "diego"

  // LOAD TASKS: Verbatim https://playground.4geeks.com/todo/users/diego
  
  const createUser = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/diego`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      getTodos(); // Load the list once user is created
    }
  };

  // 2. Load Tasks (Checks for 404 to trigger createUser)
  const getTodos = () => {
    fetch(`https://playground.4geeks.com/todo/users/diego`)
      .then((rsp) => {
        if (rsp.status === 404) {
          createUser(); // If user doesn't exist, create them
          throw new Error("User not found");
        }
        return rsp.json();
      })
      .then((data) => {
        if (data.todos) setTodos(data.todos);
      })
      .catch((error) => console.error("Error loading tasks:", error));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleInputChange = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const addTodo = () => {
    if (inputValue !== "") {
      // API expects 'label' and 'is_done'
      const taskForServer = { 
        label: `${inputValue} ${dateValue ? "| Due: " + dateValue : ""}`, 
        is_done: false 
      };

      fetch(`https://playground.4geeks.com/todo/todos/diego`, {
        method: "POST",
        body: JSON.stringify(taskForServer),
        headers: { "Content-Type": "application/json" },
      })
        .then((rsp) => rsp.json())
        .then(() => {
          getTodos(); // Refresh the list
          setInputValue(""); // Refresh text input
          setDateValue("");  // REFRESH DATE INPUT (clears it)
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  return (
    <div className="text-center w-50 mx-auto border border-secondary p-3 mt-5">
      <h1 className="text-center mt-5">
        <FontAwesomeIcon icon={faHouse} className="me-2" />
        Add a to do
      </h1>
      <div className="d-flex flex-column gap-2 w-50 mx-auto my-3">
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputChange}
        />
        {/* Date input is now active and controlled */}
        {/* <input
          type="date"
          className="form-control"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
        /> */}
        <button className="btn btn-success" onClick={addTodo}>Add Task</button>
      </div>

      {todos.length === 0 && <p className="text-secondary mt-3">No tasks, add a task</p>}

      {todos.map((todoObj, index) => (
        <Todo
          key={todoObj.id || index}
          todoValue={todoObj.label}
          isCompleted={todoObj.is_done}
          setTodos={setTodos}
          todos={todos}
          index={index}
          id={todoObj.id}
          getTodos={getTodos}
        />
      ))}
      <Footer todos={todos} />
    </div>
  );
};

export default Home;