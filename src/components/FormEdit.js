import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export default function FormEdit({ setIsEdit, item, onUpdate }) {
  const [newValue, setNewValue] = useState(item.title);
  function handleSubmit(e) {
    e.preventDefault();
    setIsEdit(false);
    onUpdate(item.id, newValue);
  }
  function handleChange(e) {
    const value = e.target.value;
    setNewValue(value);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg p-3 mb-5 bg-body rounded"
    >
      <div className="d-flex justify-content-center">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="New Phrase"
            variant="outlined"
            onChange={handleChange}
            value={newValue}
          />
        </Box>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <Button variant="contained" type="submit">
          Update
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsEdit(false)}
          color="error"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
