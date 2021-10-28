import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Error from "./pages/error";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="*" component={Error} />
      </Switch>
      <ToastContainer position="top-left" />
    </BrowserRouter>
  );
}
