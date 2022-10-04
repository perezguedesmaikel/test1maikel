import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ProjectSelect({ name, onChange, projectSelect }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Project Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={projectSelect?.id}
          defaultValue={name}
          label="Project Select"
          onChange={onChange}
        >
          {projectSelect?.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.id + "-" + item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
