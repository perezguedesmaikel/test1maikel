import React from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
