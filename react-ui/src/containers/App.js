import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import i18n from "../i18n";

// Loading Containers
import Home from "../containers/Home";
import FindRide from "../containers/FindRide";
import MyRides from "../containers/MyRides";
import OfferRide from "../containers/OfferRide";
import LogIn from "../containers/LogIn";
import SignUp from "../containers/SignUp";
import MyAccount from "../containers/MyAccount";
import Dashboard from "../containers/Dashboard";

import Page404 from "../containers/Page404";

// Loading Components
import NavigationBar from "../components/NavigationBar";
import ScrollToTop from "../components/ScrollToTop";

// Importing custom css for the whole app
import "../scss/app.scss";

// Importing NPM packages
import AOS from "aos";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lg: "en",
    };
  }

  changeLanguage = (lg) => {
    i18n.changeLanguage(lg);
    this.setState({
      lg,
    });
  };

  // Initialize Animate On Scroll librairy
  componentDidMount() {
    AOS.init();

    // fetch("/get-maps-api")
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isMapsApiKeyLoaded: true,
    //         mapsApiKey: result.mapsApiKey,
    //       });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isMapsApiKeyLoaded: true,
    //         mapsApiKeyError: error,
    //       });
    //     }
    //   );
  }

  render() {
    const { lg } = this.state;

    return (
      <Suspense fallback="Loading...">
        <Router>
          <ScrollToTop />

          <NavigationBar onClick={this.changeLanguage} lg={lg} />
          <Switch>
            <Route path="/" component={Home} exact>
              <Home />
            </Route>
            <Route path="/offer-ride" component={OfferRide} exact>
              <OfferRide />
            </Route>
            <Route path="/find-ride" component={FindRide} exact>
              <FindRide />
            </Route>
            <Route path="/my-rides" component={MyRides} exact>
              <MyRides />
            </Route>
            <Route path="/login" component={LogIn} exact>
              <LogIn />
            </Route>
            <Route path="/signup" component={SignUp} exact>
              <SignUp />
            </Route>
            <Route path="/my-account" component={MyAccount} exact>
              <MyAccount />
            </Route>
            <Route path="/dashboard" component={Dashboard} exact>
              <Dashboard />
            </Route>
            <Route component={Page404} />
          </Switch>
        </Router>
      </Suspense>
    );
  }
}
