import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Doughnut } from "react-chartjs-2";

import { Container } from "./styled.js";

import AccessAPI from "../../services/index.js";
const API = new AccessAPI();

export default function GraphO(props) {
  const { state: selectedState } = props;

  const [screenInfo, setScreenInfo] = useState({
    states: [
      {
        id: 0,
        name: "",
        vaccinated: 0,
        selected: false,
        display: "",
        color: "rgba(0, 0, 0, 0)",
        border: "rgba(255, 255, 255, 1)",
      },
    ],
    data: {
      labels: [],
      datasets: [
        {
          label: "# de Pessoas Vacinadas",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    },
  });
  const [state, setState] = useState({
    id: 0,
    name: "",
    vaccinated: 0,
    selected: false,
    display: "",
    color: "rgba(0, 0, 0, 0)",
    border: "rgba(255, 255, 255, 1)",
  });

  const loadContent = useCallback(async () => {
    try {
      const resp = await API.graphOne(selectedState);
      setScreenInfo(resp);
      return resp;
    } catch (err) {
      toast.info("Ocorreu um erro. Fechando Gráfico #1", {
        autoClose: 5000,
      });
    }
  }, [selectedState]);

  useEffect(() => {
    loadContent();
  }, [selectedState, loadContent]);

  useEffect(() => {
    let state = screenInfo.states.filter((state) => state.selected)[0];
    if (state === undefined) {
      state = {
        id: 0,
        name: "",
        vaccinated: 0,
        selected: true,
        display: "Selecione o Estado",
        color: "rgba(0, 0, 0, 0)",
        border: "rgba(255, 255, 255, 1)",
      };
    }

    setState(state);
  }, [screenInfo, selectedState]);

  return (
    <Container className="container-fluid text-white p-2 border-0 m-0">
      <div>
        <p>Total de Pessoas Vacinadas</p>
        <p>
          {state.display}: {state.vaccinated.toLocaleString("en-US")}
        </p>
      </div>
      <div>
        <Doughnut
          data={screenInfo.data}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
    </Container>
  );
}
