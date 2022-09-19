import { useState } from "react";
import uuid from "react-uuid";
import Todo from "../components/Todo";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const TrueAlphabetic = (phrase, variante) => {
    const phraseLowercase = phrase.toLowerCase();
    const stringArray = phraseLowercase.split("");
    stringArray.sort();
    //Implementing new variant
    const stringArrayWord = phraseLowercase.split(" ");
    const totalWord = stringArrayWord.length;
    let i;
    let numWord = [];
    for (i = 0; i < totalWord; i++) {
      numWord.push(stringArrayWord[i].length);
    }
    let stringOrganized = stringArray.join("").trim();
    let newWord = [];
    for (i = 0; i < totalWord; i++) {
      newWord.push(stringOrganized.slice(0, numWord[i]));
      stringOrganized = stringOrganized.replace(newWord[i], "");
    }
    let stringFinalTemp = "";
    for (i = 0; i < totalWord; i++) {
      const stringFinal = newWord[i];
      stringFinalTemp = stringFinalTemp + " " + stringFinal;
    }
    //return
    if (variante === false) {
      return stringArray.join("").trim();
    } else {
      return stringFinalTemp;
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      stringFinalTemp: TrueAlphabetic(title, true),
      title,
      stringOrder: TrueAlphabetic(title, false),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTitle("");
  }

  function handleChange(e) {
    const value = e.target.value;
    setTitle(value);
  }
  function onUpdate(id, newValue) {
    const temp = [...todos];
    const item2 = temp.find((item) => item.id === id);
    item2.title = newValue;
    item2.stringOrder = TrueAlphabetic(item2.title);
    setTodos(temp);
  }
  function onDelete(id) {
    const temp = todos.filter((item) => item.id !== id);
    setTodos(temp);
  }

  return (
    <div>
      <form className="todoCreateForm m-1" onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={"inputFirst"}
            id="outlined-basic"
            label="Enter a phrase"
            variant="outlined"
            onChange={handleChange}
            value={title}
          />
        </Box>
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          organize
        </Button>
      </form>
      <div className="d-flex flex-wrap">
        {todos.map((item) => (
          <Todo
            item={item}
            key={item.id}
            setTodos={setTodos}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
