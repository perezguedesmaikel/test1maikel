import React from "react";
import { Fieldset } from "primereact/fieldset";
import { CalendarDemo } from "./CalendarDemo";
import Switch from "./Switch";

export const PanelTest2 = () => {
  return (
    <div>
      <Switch />
      <div className="card">
        <Fieldset legend="Calculate overtime and pay associated with this.">
          <CalendarDemo />
        </Fieldset>
      </div>
    </div>
  );
};
