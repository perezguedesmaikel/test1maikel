import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button variant="contained" onClick={() => navigate("/")}>
            Test1
          </Button>
          <Button variant="contained" onClick={() => navigate("/test2")}>
            Test2
          </Button>
          <Button variant="contained" onClick={() => navigate("/test3")}>
            Test3
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
