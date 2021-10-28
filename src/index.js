import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes.js";
import GlobalStyle from "./assets/globalStyle.js";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
