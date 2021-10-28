import { formatted_name } from "../auxi.js";

async function getComboStates(axios) {
  const resp = await axios("/cases?country=Brazil");
  const data = resp.data;

  let statesNames = Object.keys(data);
  let states = [];
  statesNames.forEach((name, _index) => {
    let state = {
      id: _index,
      name: name,
      display: formatted_name[name.replaceAll(" ", "_")](),
    };

    states.push(state);
  });

  return states;
}

export { getComboStates };
