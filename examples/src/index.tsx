import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import * as React from "react";
import { render } from "react-dom";

import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
