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
  const [todos, setTodos] = useState([]);

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      addTodo();
    }
  };
  const addTodo = () => {
    if (inputValue != "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };
  return (
    <div className="text-center w-50 mx-auto border border-secondary p-3 mt-5">
      <h1 className="text-center mt-5">
        <FontAwesomeIcon icon={faHouse} />
        Add a to do
      </h1>
      <input
        type="text"
        className="from-control w-25 mx-auto my-3"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputChange}
      />
      <button className="btn btn-success" onClick={addTodo}>
        Add
      </button>
      {todos.map((label, index) => (
        <Todo todoValue={label} setTodos={setTodos} key={index} todos={todos} />
      ))}
      <Footer todos={todos} />
    </div>
  );
};

export default Home;
