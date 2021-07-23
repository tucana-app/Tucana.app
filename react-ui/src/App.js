import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading Containers
import Fallback from "./components/Fallback";
import Home from "./containers/Home";
import FindRide from "./containers/FindRide";

import Ride from "./containers/Ride";
import MyRides from "./containers/MyRides/MyRides";
import MyRidesDriver from "./containers/MyRides/MyRidesDriver";
import MyRidesBookings from "./containers/MyRides/MyRidesBookings";
import Bookings from "./containers/Bookings";
import Booking from "./containers/Booking";

import OfferRide from "./containers/OfferRide";
import LogIn from "./containers/Auth/LogIn";

import SignUp from "./containers/Auth/SignUp";
import SignUpSuccess from "./containers/Auth/SignUpSuccess";
import SignUpConfirm from "./containers/Auth/SignUpConfirm";

import Help from "./containers/Help";
import Download from "./containers/Download";
import Donate from "./containers/Donate";
import ComingSoon from "./containers/ComingSoon";

// All pages included in the side menu
import SideMenu from "./containers/SideMenu/SideMenu";
import MyAccount from "./containers/SideMenu/MyAccount";
import Settings from "./containers/SideMenu/Settings";
import Contact from "./containers/SideMenu/Contact";
import NotificationPage from "./containers/NotificationPage";

import Page404 from "./containers/Page404";

// Amind
import Admin from "./containers/Admin/Admin";
import Test from "./containers/Admin/Test";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Toasts from "./components/Toasts";
import MessageFee from "./components/MessageFee";

import { clearFeedback, getNotifications } from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  if (isLoggedIn) dispatch(getNotifications(currentUser.id));

  useEffect(() => {
    history.listen((location) => {
      if (isLoggedIn) dispatch(getNotifications(currentUser.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    history.listen((location) => {
      // clear message when changing location
      dispatch(clearFeedback());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Suspense fallback={<Fallback />}>
      <Router history={history}>
        <ScrollToTop />
        <MessageFee />
        <NavigationBar />
        <Toasts />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/offer-ride" component={OfferRide} />
          <Route exact path="/find-ride" component={FindRide} />

          <Route exact path="/ride/:rideId" component={Ride} />
          <Route exact path="/my-rides" component={MyRides} />
          <Route exact path="/my-rides/driver" component={MyRidesDriver} />
          <Route exact path="/my-rides/bookings" component={MyRidesBookings} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/booking/:bookingId" component={Booking} />

          <Route exact path="/login" component={LogIn} />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup-successful" component={SignUpSuccess} />
          <Route
            exact
            path="/confirm/:confirmEmailUUID"
            component={SignUpConfirm}
          />

          <Route exact path="/menu" component={SideMenu} />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/download" component={Download} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/notifications" component={NotificationPage} />
          <Route exact path="/coming-soon" component={ComingSoon} />

          {/* Admin */}
          <Route exact path="/admin/secret" component={Admin} />
          <Route exact path="/admin/test" component={Test} />

          <Route component={Page404} />
        </Switch>

        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
