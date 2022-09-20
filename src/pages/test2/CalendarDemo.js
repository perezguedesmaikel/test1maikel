import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputTimer from "./InputTimer";

export const CalendarDemo = ({ mod24 }) => {
  const [pay, setPay] = useState(null);
  const [startWork, setStartWork] = useState("");
  const [endWork, setEndWork] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [overTimeMultiplier, setOverTimeMultiplier] = useState("");
  //case 12 hours
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [result, setResult] = useState(null);
  const [result2, setResult2] = useState(null);
  const [hourlyRate2, setHourlyRate2] = useState("");
  const [overTimeMultiplier2, setOverTimeMultiplier2] = useState("");
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
  function handleChangeTimer(e) {
    const time = e.value.toString().trim();
    const timeReal = time.slice(16, 21);
    const horas = timeReal.slice(0, 2);
    const minutes = timeReal.slice(3);
    const decimal = (parseInt(minutes) * 100) / 60;
    const decimalRounded = Math.round(decimal);
    const resultTemp = horas + "." + decimalRounded;
    switch (e.target.name) {
      case "date":
        setDate(e.value);
        setResult(resultTemp);
        break;
      case "date2":
        setDate2(e.value);
        setResult2(resultTemp);
        break;
      default:
        console.log("default");
    }
  }
  function handleChangeInputTimer(e) {
    switch (e.target.name) {
      case "overTimeMultiplier2":
        setOverTimeMultiplier2(e.target.value);
        break;
      case "hourlyRate2":
        setHourlyRate2(e.target.value);
        break;
      default:
        console.log("default");
    }
  }
  function handleClick2() {
    const arrayPay = [result, result2, overTimeMultiplier2, hourlyRate2];
    setPay(calculateTotalPay(arrayPay));
  }

  return (
    <>
      <div
        className={`d-flex flex-wrap justify-content-center ${
          mod24 ? "d-none" : ""
        }`}
      >
        <label className="mt-3 mx-3">start:</label>
        <InputTimer
          handleChange={handleChangeTimer}
          date={date}
          name={"date"}
        />
        <label className="mt-3 mx-3"> end:</label>
        <InputTimer
          handleChange={handleChangeTimer}
          date={date2}
          name={"date2"}
        />
        <TextField
          type="number"
          onChange={handleChangeInputTimer}
          className="m-1"
          value={overTimeMultiplier2}
          name={"overTimeMultiplier2"}
          label="Overtime multiplier"
          variant="outlined"
        />
        <TextField
          type="number"
          onChange={handleChangeInputTimer}
          value={hourlyRate2}
          className="m-1"
          label="Hourly rate"
          variant="outlined"
          name={"hourlyRate2"}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleClick2}
          color="secondary"
        >
          Calculate
        </Button>
      </div>
      <label
        className={`colorVioleta fs-6 text-start ${mod24 ? "d-none" : ""}`}
      >
        The pay is: <span className="text-success">{pay ? pay : ""}</span>
      </label>
      <div
        className={`d-flex justify-content-center container ${
          mod24 ? "" : "d-none"
        }`}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="number"
            name={"startWork"}
            label="Start of working day"
            value={startWork}
            onChange={handleChange}
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            type="number"
            value={endWork}
            name={"endWork"}
            onChange={handleChange}
            label="End of working day"
            variant="outlined"
            fullWidth={true}
          />
          <TextField
            type="number"
            label="Hourly rate"
            variant="outlined"
            fullWidth={true}
            value={hourlyRate}
            name={"hourlyRate"}
            onChange={handleChange}
          />
          <TextField
            type="number"
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
