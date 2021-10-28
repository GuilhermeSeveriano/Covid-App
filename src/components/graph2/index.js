import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";

import { Container } from "./styled";

import AccessAPI from "../../services/index.js";
const API = new AccessAPI();

export default function GraphTw(props) {
  const { state: selectedState } = props;

  const standartScreenInfo = {
    state: {
      id: 0,
      name: "",
      vaccinated: 0,
      selected: true,
      display: "Selecione o Estado",
      color: `rgba(0, 0, 0, 0)`,
      border: `rgba(0, 0, 0, 0)`,
    },
    quantities: {
      firstVac: 0,
      secondVac: 0,
      stateVac: 0,
    },
    data: {
      labels: ["1° Dose", "2° Dose", `Total | Selecione o Estado`],
      datasets: [
        {
          label: "Quantidade de Pessoas Vacinadas",
          data: [0, 0, 0],
          backgroundColor: [
            "rgba(75, 192, 192)",
            "rgba(255, 206, 86)",
            "rgba(54, 162, 235)",
          ],
          borderColor: ["rgba(255, 255, 255)"],
          borderWidth: 1,
        },
      ],
    },
  };

  const [screenInfo, setScreenInfo] = useState(standartScreenInfo);

  const loadContent = useCallback(async () => {
    try {
      const resp = await API.graphTwo(selectedState);
      setScreenInfo(resp);
      return resp;
    } catch (err) {
      toast.info("Ocorreu um erro. Fechando Gráfico #2", {
        autoClose: 5000,
      });
    }
  }, [selectedState]);

  useEffect(() => {
    loadContent();
  }, [selectedState, loadContent]);

  return (
    <Container className="container-fluid text-white p-2 border-0 m-0">
      <div>
        <p>Pessoas Vacinadas no Brasil:</p>
      </div>
      <div>
        <Bar
          data={screenInfo.data}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
    </Container>
  );
}
