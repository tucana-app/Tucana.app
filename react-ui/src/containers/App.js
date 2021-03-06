import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import i18n from "../i18n";

// Loading Containers
import Home from "../containers/Home/Home";
import FindRide from "../containers/FindRide/FindRide";
import OfferRide from "../containers/OfferRide/OfferRide";
import LogIn from "../containers/LogIn/LogIn";
import SignUp from "../containers/SignUp/SignUp";
import Covid19 from "../containers/Covid19/Covid19";

import Page404 from "../containers/Page404/Page404";

// Loading Components
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Footer from "../components/Footer/Footer";

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
            <Route path="/login" component={LogIn} exact>
              <LogIn />
            </Route>
            <Route path="/signup" component={SignUp} exact>
              <SignUp />
            </Route>
            <Route path="/covid19" component={Covid19} exact>
              <FindRide />
            </Route>
            <Route component={Page404} />
          </Switch>

          <Footer />
        </Router>
      </Suspense>
    );
  }
}
