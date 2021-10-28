import React from "react";

import { Head, SelectArea } from "./styled";

export default function Header(props) {
  const { states, setState } = props;

  return (
    <Head className="container-fluid p-2 d-flex justify-content-between align-items-center text-white">
      <div>
        <h3 className="text-decoration-underline">COVID-19 no Brasil</h3>
      </div>
      <SelectArea className="d-flex h-100 justify-content-between align-items-center">
        <div className="form-group text-area">
          <p className="m-0 p-0">Selecione o Estado:</p>
        </div>
        <div className="form-group select-area">
          <select
            className="form-select w-100"
            onChange={(e) =>
              setState(e.target.options[e.target.selectedIndex].value)
            }
          >
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.display}
              </option>
            ))}
          </select>
        </div>
      </SelectArea>
    </Head>
  );
}
