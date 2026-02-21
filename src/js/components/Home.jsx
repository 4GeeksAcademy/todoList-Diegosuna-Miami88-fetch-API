import React, { useState } from "react";
import { Todo } from "./Todo.jsx";
import { Footer } from "./Footer.jsx";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState(""); 
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (inputValue !== "") {
      // 1. Create the task object exactly as the API expects
      const taskForServer = {
        label: inputValue,
        is_done: false,
      };

      // 2. Use the correct POST endpoint for tasks: /todos/
      fetch("https://playground.4geeks.com/todo/Diego", {
        method: "POST",
        body: JSON.stringify(taskForServer),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((rsp) => {
          if (!rsp.ok) throw new Error("Check if user 'Diego' exists first!");
          return rsp.json();
        })
        .then((data) => {
          // 3. Update local state using the 'data' from the server (which includes the unique ID)
          // We manually add our local dateValue so the UI can display it
          setTodos([...todos, { ...data, date: dateValue }]); 
          setInputValue("");
          setDateValue("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  // had to correct the return to the correct format placing it directly int the home component 
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
        <input
          type="date"
          className="form-control"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTodo}>
          Add Task
        </button>
      </div>

      {todos.length === 0 && (
        <p className="text-secondary mt-3">No tasks, add a task</p>
      )}

      {todos.map((todoObj, index) => (
        <Todo
          key={todoObj.id || index} // Using the server ID is better than the index
          todoValue={todoObj.label}
          dateValue={todoObj.date}
          isCompleted={todoObj.is_done}
          setTodos={setTodos}
          todos={todos}
          index={index}
        />
      ))}
      <Footer todos={todos} />
    </div>
  );
};

export default Home;
