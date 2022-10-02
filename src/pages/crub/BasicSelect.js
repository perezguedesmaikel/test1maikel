import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ name, onInputChange, dataSelect }) {
  const { userName } = dataSelect;
  return (
    <Box sx={{ minWidth: 120, marginTop: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Name</InputLabel>
        <Select
          value={userName}
          defaultValue={name}
          labelId="demo-simple-select-label"
          id="name"
          label="User Name"
          onChange={(e) => onInputChange(e, "name")}
        >
          {dataSelect?.map(({ id, surname, userName: userName1 }) => (
            <MenuItem value={`${userName1}`} key={id}>
              {`${id + "-" + userName1 + " " + surname}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
