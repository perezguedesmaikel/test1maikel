import React from "react";
import "./App.css";
import TodoApp from "./pages/TodoApp";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Test2 from "./pages/test2/Test2";
import Crub from "./pages/crub/Crub";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={"/test3"} element={<Crub />} />
      </Routes>
      <div className="container">
        <Routes>
          <Route path={"/test2"} element={<Test2 />} />
          <Route path={"/"} element={<TodoApp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
