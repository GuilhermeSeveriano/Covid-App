import { getComboStates } from "./header";
import { loadStates } from "./graph1";
import { loadVac } from "./graph2";
import { loadPeople } from "./graph3";

import axios from "axios";
import { loadMonths } from "./graph4";
const api = axios.create({
  baseURL: "https://covid-api.mmediagroup.fr/v1",
});

export default class AccessAPI {
  async comboStates() {
    const resp = await getComboStates(api.get);
    return resp;
  }

  async graphOne(selectedState) {
    const resp = await loadStates(api.get, selectedState);
    return resp;
  }

  async graphTwo(selectedState) {
    const resp = await loadVac(api.get, selectedState);
    return resp;
  }

  async graphThree(selectedState) {
    const resp = await loadPeople(api.get, selectedState);
    return resp;
  }

  async graphFour() {
    const resp = await loadMonths(api.get);
    return resp;
  }
}
