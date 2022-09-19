import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function InputTimer() {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;
  const [date8, setDate8] = useState(null);

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  return (
    <div>
      <div className="card m-1 mx-2">
        <div className="p-fluid grid formgrid">
          <Calendar
            id="time12"
            value={date8}
            onChange={(e) => setDate8(e.value)}
            timeOnly
            hourFormat="12"
          />
        </div>
      </div>
    </div>
  );
}
