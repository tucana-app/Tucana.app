import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import HttpsRedirect from "react-https-redirect";
import { Loader } from "@googlemaps/js-api-loader";

// Loading Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import AOS from "aos";
AOS.init();

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

loader
  .load()
  .then((google) => {
    console.log("Google Maps loaded successfully");
  })
  .catch((e) => {
    console.log(`GMAPI error: ${e}`);
  });

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
serviceWorker.unregister();
