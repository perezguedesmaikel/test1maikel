import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputTimer from "./InputTimer";

export const CalendarDemo = () => {
  const [pay, setPay] = useState(null);
  const [startWork, setStartWork] = useState("");
  const [endWork, setEndWork] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [overTimeMultiplier, setOverTimeMultiplier] = useState("");
  function handleChange(e) {
    switch (e.target.name) {
      case "startWork":
        setStartWork(e.target.value);
        break;
      case "endWork":
        setEndWork(e.target.value);
        break;
      case "hourlyRate":
        setHourlyRate(e.target.value);
        break;
      case "overTimeMultiplier":
        setOverTimeMultiplier(e.target.value);
        break;
      default:
        console.log("Default Value");
    }
  }
  function handleClick() {
    const arrayPay = [startWork, endWork, hourlyRate, overTimeMultiplier];
    setPay(calculateTotalPay(arrayPay));
    setStartWork("");
    setEndWork("");
    setHourlyRate("");
    setOverTimeMultiplier("");
  }
  function calculateTotalPay(array) {
    const extraHoursWork = array[1] - array[0] - 8;
    const basicPay = array[2] * 8;
    const extraPay = extraHoursWork * array[2] * array[3];
    return extraPay + basicPay;
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        <label className="mt-3 mx-3">start:</label>
        <InputTimer />
        <label className="mt-3 mx-3"> end:</label>
        <InputTimer />
        <TextField
          className="m-1"
          name={"overTimeMultiplier2"}
          value={overTimeMultiplier}
          onChange={handleChange}
          label="Overtime multiplier"
          variant="outlined"
        />
        <TextField
          className="m-1"
          label="Hourly rate"
          variant="outlined"
          value={hourlyRate}
          name={"hourlyRate2"}
          onChange={handleChange}
        />
        <Button variant="contained" size="large" onClick={handleClick}>
          Calculate
        </Button>
      </div>
      <div className="d-flex justify-content-center container">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name={"startWork"}
            label="Start of working day"
            value={startWork}
            onChange={handleChange}
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            value={endWork}
            name={"endWork"}
            onChange={handleChange}
            label="End of working day"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            label="Hourly rate"
            variant="outlined"
            fullWidth={true}
            value={hourlyRate}
            name={"hourlyRate"}
            onChange={handleChange}
          />
          <TextField
            name={"overTimeMultiplier"}
            value={overTimeMultiplier}
            onChange={handleChange}
            label="Overtime multiplier"
            variant="outlined"
            fullWidth={true}
          />
          <Button variant="contained" size="large" onClick={handleClick}>
            Calculate
          </Button>
          <label className="text-primary fs-6">
            The pay is: <span className="text-success">{pay ? pay : ""}</span>
          </label>
        </Box>
      </div>
    </>
  );
};
