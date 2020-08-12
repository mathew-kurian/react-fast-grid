import "core-js/stable";
import * as React from "react";
import { render } from "react-dom";

import App from "./App";
import "./styles.css";

const start = () => render(<App />, document.getElementById("root"));

if (["complete", "interactive"].includes(document.readyState)) {
  start();
} else {
  document.addEventListener("DOMContentLoaded", start);
}

//@ts-ignore
window.module = {}; // obligatory line for now (TODO remove)
