import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading Containers
import Fallback from "./components/Fallback";
import Home from "./containers/Home";
import FindRide from "./containers/FindRide";
import MyRides from "./containers/MyRides";
import OfferRide from "./containers/OfferRide";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import SignUpStep2 from "./containers/SignUp/SignUpStep2";
import SignUpSuccess from "./containers/SignUp/SignUpSuccess";
import SideMenu from "./containers/SideMenu";
import Dashboard from "./containers/Dashboard";
import Help from "./containers/Help";
import ComingSoon from "./containers/ComingSoon";

// All pages related to user account
import MyAccount from "./containers/SideMenu/MyAccount";
import Settings from "./containers/SideMenu/Settings";

import Page404 from "./containers/Page404";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { clearMessage } from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";
import MessageFee from "./components/MessageFee";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <Suspense fallback={<Fallback />}>
      <Router history={history}>
        <ScrollToTop />

        <MessageFee />
        <NavigationBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/offer-ride" component={OfferRide} />
          <Route exact path="/find-ride" component={FindRide} />
          <Route exact path="/my-rides" component={MyRides} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/step-2" component={SignUpStep2} />
          <Route
            exact
            path="/signup/signup-success"
            component={SignUpSuccess}
          />
          <Route exact path="/menu" component={SideMenu} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/coming-soon" component={ComingSoon} />

          <Route component={Page404} />
        </Switch>

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
