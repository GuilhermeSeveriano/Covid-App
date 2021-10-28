import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pie } from "react-chartjs-2";

import { Container } from "./styled.js";

import AccessAPI from "../../services/index.js";
const API = new AccessAPI();

export default function GraphTr(props) {
  const { state: selectedState } = props;

  const [screenInfo, setScreenInfo] = useState({
    state: {
      id: 0,
      name: "",
      selected: false,
      display: "Selecione o Estado",
      graphQuantities: {
        infected: 0,
        deaths: 0,
        total: 0,
      },
    },
    data: {
      labels: ["Infectadas", "Mortas"],
      datasets: [
        {
          label: "Quantidade de Pessoas",
          data: [0, 0],
          backgroundColor: ["rgba(255, 206, 86)", "rgba(255, 99, 132)"],
          borderColor: ["rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
  });

  const loadContent = useCallback(async () => {
    try {
      const resp = await API.graphThree(selectedState);
      setScreenInfo(resp);
      return resp;
    } catch (err) {
      toast.info("Ocorreu um erro. Fechando Gráfico #3", { autoClose: 5000 });
    }
  }, [selectedState]);

  useEffect(() => {
    loadContent();
  }, [selectedState, loadContent]);

  return (
    <Container className="container-fluid text-white p-2 border-0 m-0">
      <div>
        <p>Pessoas Infectadas e Mortas</p>
        <p>
          {screenInfo.state.selected
            ? `Total de Pessoas | ${
                screenInfo.state.display
              }: ${screenInfo.state.graphQuantities.total.toLocaleString(
                "en-US"
              )}`
            : screenInfo.state.display}
        </p>
      </div>
      <div>
        <Pie data={screenInfo.data} />
      </div>
    </Container>
  );
}
