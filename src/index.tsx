import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta httpEquiv="Content-Script-Type" content="text/javascript" />
      <script
        type="text/javascript"
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js?ver=5.7.2"
        id="jquery-js"
      ></script>
      <script
        async
        src="https://kit.fontawesome.com/acecca202b.js"
        crossOrigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </head>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
