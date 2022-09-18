import React from "react";
import { Fieldset } from "primereact/fieldset";
import { CalendarDemo } from "./CalendarDemo";

export const PanelTest2 = () => {
  return (
    <div>
      <div className="card">
        <Fieldset legend="Calculate overtime and pay associated with this.">
          <CalendarDemo />
        </Fieldset>
      </div>
    </div>
  );
};
