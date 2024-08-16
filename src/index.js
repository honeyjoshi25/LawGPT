import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./i18n";
import { HeaderProvider } from "./Context/Provider/HeaderProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HeaderProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </HeaderProvider>
);
