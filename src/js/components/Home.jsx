import React, { useState } from "react";
import { Todo } from "./Todo.jsx";
import { Footer } from "./Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState(""); // Added for dateline
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      addTodo();
    }
  };
  const addTodo = () => {
    if (inputValue != "") {
      // Modified to save task as an object with date and completion status instead saving the srting now we save the object with the label and date
      setTodos([...todos, { label: inputValue, date: dateValue, completed: false }]);
      setInputValue("");// this ensures the input goes blank after you click add
      setDateValue("");
    }
  };
  return (
    <div className="text-center w-50 mx-auto border border-secondary p-3 mt-5">
      <h1 className="text-center mt-5">
        <FontAwesomeIcon icon={faHouse} />
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
          value={dateValue} // added a second ibnput for the date and we bind it to the dateValue state
          onChange={(e) => setDateValue(e.target.value)}
        />
        <button className="btn btn-success" onClick={addTodo}>
          Add
        </button>
      </div>
      {todos.length === 0 && <p className="text-secondary mt-3">No tasks, add a task</p>}
      {todos.map((todoObj, index) => ( // update .map() to reflect the new structure of the todo object!!!!
        <Todo 
          key={index}
          todoValue={todoObj.label} 
          dateValue={todoObj.date}
          isCompleted={todoObj.completed}
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
