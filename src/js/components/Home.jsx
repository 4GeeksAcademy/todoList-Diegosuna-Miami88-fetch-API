import React, { useState, useEffect } from "react";
import { Todo } from "./Todo.jsx";
import { Footer } from "./Footer.jsx";
import { faHouse, faSync } from "@fortawesome/free-solid-svg-icons"; // Added fatSync faSync icon is use on line  85
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState([]);
  // const username = "diego";

  const handleRefresh = () => {
    window.location.reload(); //Added refresh fucntion " this is how you called a function Diego!!!!!!!!"
  };
  //funtion fect async will calle or trasport the data from API library remember we have to follow API library rules for URLs
  const createUser = async () => {
    try {
      const resp = await fetch(
        `https://playground.4geeks.com/todo/users/diego`, // with this we make sure we fetch the data (trasport) from API library
        {
          method: "POST", //this specified the HTTP request method
          headers: { "Content-Type": "application/json" }, //this sets an HTTP header to provide metadata about body request { "Content-Type": "application/json" } is critical to inform the server that the data included in the request body is a JSON ensures proper interpretation 
        },
      );
      if (resp.ok) { // this build-in property of the fetch response it return true if the HTTP status code is in 200 - 299 meaning request was succesful 
        await getTodos(); //if the request worked the code triggers a secondary function to refresh your data For example, if you just "POSTed" a new To-Do item to the database, you want to immediately "GET" the updated list so the user sees the new item on the screen.
      }
    } catch (error) { // this prevenst your Applicantion from crashing if something goes wrong
      console.error("Error creating user:", error); // if there is a network fail the code jumps straight to this block and prints aa helpful message!! to the developer console 
    }
  };

  const getTodos = async () => {
    try {
      const rsp = await fetch(`https://playground.4geeks.com/todo/users/diego`);

      if (rsp.status === 404) {
        await createUser();
        return;
      }

      if (!rsp.ok) throw new Error("Failed to fetch todos");

      const data = await rsp.json();
      if (data.todos) setTodos(data.todos);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleInputChange = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const addTodo = async () => {
    if (inputValue !== "") {
      const taskForServer = {
        label: inputValue, // modify function to remove date and just add a todo
        is_done: false,
      };

      try {
        const resp = await fetch(
          `https://playground.4geeks.com/todo/todos/diego`,
          {
            method: "POST",
            body: JSON.stringify(taskForServer),
            headers: { "Content-Type": "application/json" },
          },
        );

        if (resp.ok) {
          await getTodos();
          setInputValue("");
          // Remove setDateValue("");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

    // fuction delete using .../todo/todos/${id}
  const deleteTodo = async (id) => {
    try {
      const resp = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!resp.ok) throw new Error("Failed to delete");

      await getTodos(); // refresh list from server
    } catch (error) {
      console.error("Error deleting:", error);
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
        <button className="btn btn-success" onClick={addTodo}>
          Add Task
        </button>
      </div>

      {todos.length === 0 && (
        <p className="text-secondary mt-3">No tasks, add a task</p>
      )}

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
          deleteTodos={deleteTodo}
        />
      ))}
      <Footer todos={todos} />
    </div>
  );
};

export default Home;
