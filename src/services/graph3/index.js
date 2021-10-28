import { formatted_name } from "../auxi.js";

async function loadPeople(axios, selectedState) {
  const resp = await axios("/cases?country=Brazil");
  const dataAPI = resp.data;

  let statesNames = Object.keys(dataAPI);
  let state = {};
  statesNames.forEach((name, _index) => {
    if (name === selectedState) {
      state = {
        id: _index,
        name: name,
        selected: true,
        display: formatted_name[name.replaceAll(" ", "_")](),
        graphQuantities: {
          infected: dataAPI[name].confirmed,
          deaths: dataAPI[name].deaths,
          total: dataAPI[name].confirmed + dataAPI[name].deaths,
        },
      };
    }
  });

  const data = loadData(state);

  return {
    state,
    data,
  };
}

function loadData(state) {
  return {
    labels: ["Infectadas", "Mortas"],
    datasets: [
      {
        label: "Quantidade de Pessoas",
        data: [state.graphQuantities.infected, state.graphQuantities.deaths],
        backgroundColor: ["rgba(255, 206, 86, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(255, 206, 86, 0.8)", "rgba(255, 99, 132, 0.8)"],
        borderWidth: 1,
      },
    ],
  };
}

export { loadPeople };
