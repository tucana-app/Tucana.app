import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading Containers
import Fallback from "./components/Fallback";
import Home from "./containers/Home";
import FindRide from "./containers/FindRide";

import Ride from "./containers/Ride";
import MyRides from "./containers/MyRides";
import MyRidesDriver from "./containers/MyRides/MyRidesDriver";
import Bookings from "./containers/MyRides/Bookings";

import OfferRide from "./containers/OfferRide";
import LogIn from "./containers/LogIn";

import SignUp from "./containers/SignUp";
// import SignUpStep2 from "./containers/SignUp/SignUpStep2";
import SignUpSuccess from "./containers/SignUp/SignUpSuccess";

import SideMenu from "./containers/SideMenu";
import Help from "./containers/Help";
import Download from "./containers/Download";
import Donate from "./containers/Donate";
import ComingSoon from "./containers/ComingSoon";

// All pages included in the side menu
import MyAccount from "./containers/SideMenu/MyAccount";
import Settings from "./containers/SideMenu/Settings";
import Contact from "./containers/SideMenu/Contact";
import Messages from "./containers/Messages";

import Page404 from "./containers/Page404";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import { clearFeedback, getDriverNewRidesRequests } from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";
import MessageFee from "./components/MessageFee";

function App() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    history.listen((location) => {
      // clear message when changing location
      dispatch(clearFeedback());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (isLoggedIn) dispatch(getDriverNewRidesRequests(currentUser.id));

  useEffect(() => {
    history.listen((location) => {
      if (isLoggedIn) dispatch(getDriverNewRidesRequests(currentUser.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

          <Route exact path="/ride/:rideId" component={Ride} />
          <Route exact path="/my-rides" component={MyRides} />
          <Route exact path="/my-rides/driver" component={MyRidesDriver} />
          <Route exact path="/my-rides/bookings" component={Bookings} />

          <Route exact path="/login" component={LogIn} />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup-successful" component={SignUpSuccess} />

          <Route exact path="/menu" component={SideMenu} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/download" component={Download} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/coming-soon" component={ComingSoon} />

          <Route component={Page404} />
        </Switch>

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
