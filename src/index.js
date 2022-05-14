import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import HttpsRedirect from "react-https-redirect";

// Loading Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import AOS from "aos";
AOS.init();

ReactDOM.render(
  <React.StrictMode>
    {/* <HttpsRedirect> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </HttpsRedirect> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// Register() the service worker.
serviceWorker.register();
