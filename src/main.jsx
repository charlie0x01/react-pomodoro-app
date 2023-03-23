import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// bulma css
import "bulma/css/bulma.css";
// toastify css
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
