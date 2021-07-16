import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading Containers
import Home from "./containers/Home";
import FindRide from "./containers/FindRide";
import MyRides from "./containers/MyRides";
import OfferRide from "./containers/OfferRide";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import MyAccount from "./containers/MyAccount";
import Dashboard from "./containers/Dashboard";
import MyAccountInformation from "./containers/MyAccountInformation";
import MyAccountSettings from "./containers/MyAccountSettings";
import Help from "./containers/Help";
import ComingSoon from "./containers/ComingSoon";

import Page404 from "./containers/Page404";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import ScrollToTop from "./components/ScrollToTop";

import { clearMessage } from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <Suspense fallback="Loading...">
      <Router history={history}>
        <ScrollToTop />

        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/offer-ride" component={OfferRide} />
          <Route exact path="/find-ride" component={FindRide} />
          <Route exact path="/my-rides" component={MyRides} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/my-information"
            component={MyAccountInformation}
          />
          <Route exact path="/my-settings" component={MyAccountSettings} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/coming-soon" component={ComingSoon} />

          <Route component={Page404} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
