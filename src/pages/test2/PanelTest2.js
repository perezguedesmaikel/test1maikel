import React, { useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { CalendarDemo } from "./CalendarDemo";
import Switch from "./Switch";

export const PanelTest2 = () => {
  const [mod24, setMod24] = useState(true);
  return (
    <div>
      <Switch setMod24={setMod24} mod24={mod24} />
      <div className="card">
        <Fieldset legend={`Calculate overtime and pay associated with this.`}>
          <CalendarDemo mod24={mod24} />
        </Fieldset>
      </div>
    </div>
  );
};
