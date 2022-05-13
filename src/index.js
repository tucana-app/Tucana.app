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
    <HttpsRedirect>
      <Provider store={store}>
        <App />
      </Provider>
    </HttpsRedirect>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
