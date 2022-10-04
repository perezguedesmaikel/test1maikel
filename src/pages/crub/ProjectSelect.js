import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Supabase } from "../../supabase/supabase";

export default function ProjectSelect() {
  const [projectSelect, setProjectSelect] = React.useState(null);
  const [project, setProject] = React.useState("");

  const handleChange = (event) => {
    setProject(event.target.value);
  };
  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await Supabase.from("project").select();
      setProjectSelect(data);
      error ? console.log(error) : console.log(data);
    }

    fetchProject().then();
  }, []);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Project Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={project}
          label="Project Select"
          onChange={handleChange}
        >
          {projectSelect?.map((item) => (
            <MenuItem value={item.name} key={item.id}>
              {item.id + "-" + item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
