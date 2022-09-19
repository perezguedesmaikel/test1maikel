import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

export default function Switch() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        24h
      </Fab>
    </Box>
  );
}
