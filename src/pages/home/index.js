import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import GraphO from "../../components/graph1";
import GraphTw from "../../components/graph2";
import GraphTr from "../../components/graph3";
import GraphF from "../../components/graph4";

import AccessAPI from "../../services";
const API = new AccessAPI();

export default function Home() {
  const [selectedState, setSelectedState] = useState("All");

  const [states, setStates] = useState([
    {
      id: 0,
      name: "All",
      vaccinated: 0,
      selected: true,
      display: "Todos",
      color: "rgba(0, 0, 0, 0)",
      border: "rgba(255, 255, 255, 1)",
    },
  ]);

  const loadComboStates = async () => {
    const resp = await API.comboStates();
    setStates([...resp]);
    return resp;
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      loadComboStates();
      setLoaded(true);
    }
  }, [loaded]);

  return (
    <div>
      <Header states={states} setState={setSelectedState} />
      <div className="container-fluid p-3 d-flex flex-column">
        <div className="container-fluid d-flex justify-content-between flex-wrap mb-2">
          <GraphO state={selectedState} />
          <GraphTw state={selectedState} />
          <GraphTr state={selectedState} />
        </div>
        <div className="container-fluid d-flex">
          <GraphF />
        </div>
      </div>
    </div>
  );
}
