import { formatted_name } from "../auxi.js";

async function loadVac(axios, selectedState) {
  const resp = await axios("/vaccines?country=Brazil");
  const dataAPI = resp.data;

  let state = await loadState(axios, selectedState);
  let stateVac, firstVac, secondVac;
  if (state.name === "All") {
    stateVac = dataAPI[selectedState].administered;
    firstVac = dataAPI["All"].people_partially_vaccinated - 0;
    secondVac = dataAPI["All"].people_vaccinated - 0;
  } else {
    stateVac = dataAPI[selectedState].administered;
    firstVac = dataAPI["All"].people_partially_vaccinated - stateVac;
    secondVac = dataAPI["All"].people_vaccinated - stateVac;
  }

  const quantities = {
    firstVac,
    secondVac,
    stateVac,
  };

  const data = loadData(quantities, state.display);

  return {
    state,
    quantities,
    data,
  };
}

async function loadState(axios, selectedState) {
  const resp = await axios("/vaccines?country=Brazil");
  const dataAPI = resp.data;

  let statesNames = Object.keys(dataAPI);
  let state = {};
  statesNames.forEach((name, _index) => {
    if (name === selectedState) {
      state = {
        id: _index,
        name: name,
        vaccinated: dataAPI[name].administered,
        selected: true,
        display: formatted_name[name.replaceAll(" ", "_")](),
        color: `rgba(255, 255, 255, 0.8)`,
        border: `rgba(255, 255, 255, 1)`,
      };
    }
  });

  return state;
}

function loadData(quantities, selectedState) {
  return {
    labels: ["1° Dose", "2° Dose", `Total | ${selectedState}`],
    datasets: [
      {
        label: "Quantidade de Pessoas Vacinadas",
        data: [quantities.firstVac, quantities.secondVac, quantities.stateVac],
        backgroundColor: [
          "rgba(50, 192, 132)",
          "rgba(255, 206, 86)",
          "rgba(54, 162, 235)",
        ],
        borderColor: ["rgba(255, 255, 255)"],
        borderWidth: 1,
      },
    ],
  };
}

export { loadVac };
