import { formatted_name, colors } from "../auxi";

async function loadStates(axios, selectedState) {
  const resp = await axios("/vaccines?country=Brazil");
  const dataAPI = resp.data;

  let statesNames = Object.keys(dataAPI);
  let states = [];
  statesNames.forEach((name, _index) => {
    let state = {};
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
    } else {
      let rgb = colors[_index % 6];
      state = {
        id: _index,
        name: name,
        vaccinated: dataAPI[name].administered,
        selected: false,
        display: formatted_name[name.replaceAll(" ", "_")](),
        color: `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.5)`,
        border: `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.8)`,
      };
    }

    if (name !== "All" && name !== "Unknown") states.push(state);
  });

  const data = loadData(states);

  return {
    states,
    data,
  };
}

function loadData(states) {
  let labels = states.map((state) => state.display);
  let data = states.map((state) => state.vaccinated);
  let backgroundColor = states.map((state) => state.color);
  let borderColor = states.map((state) => state.border);

  return {
    labels,
    datasets: [
      {
        label: "# de Pessoas Vacinadas",
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
}

export { loadStates };
