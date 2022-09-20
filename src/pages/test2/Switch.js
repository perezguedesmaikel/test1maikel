import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

export default function Switch({ setMod24, mod24 }) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        color={mod24 ? "primary" : "secondary"}
        aria-label="add"
        onClick={() => setMod24(!mod24)}
      >
        {mod24 ? "24" : "12"}
      </Fab>
    </Box>
  );
}
