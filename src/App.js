import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Loading Containers
import LogIn from "./containers/User/LogIn";
import ForgotPassword from "./containers/User/ForgotPassword";
import CreateNewPassword from "./containers/User/CreateNewPassword";
import SignUp from "./containers/User/SignUp";
import SignUpSuccess from "./containers/User/SignUpSuccess";
import SignUpConfirm from "./containers/User/SignUpConfirm";

import Fallback from "./components/Fallback";
import Home from "./containers/Home";
import FindRide from "./containers/FindRide";
import MessagePage from "./containers/MessagePage";

import Ride from "./containers/Ride";
import Rides from "./containers/Rides";
import RidesDriver from "./containers/Rides/RidesDriver";
import RidesBookings from "./containers/Rides/RidesBookings";
import Bookings from "./containers/Bookings";
import Booking from "./containers/Booking";
import OfferRide from "./containers/OfferRide";

import BecomeDriver from "./containers/BecomeDriver";

// All pages included in the side menu
import SideMenu from "./containers/SideMenu/SideMenu";
import RatingsPassenger from "./containers/SideMenu/RatingsPassenger";
import RatingsDriver from "./containers/SideMenu/RatingsDriver";
import Ratings from "./containers/SideMenu/Ratings";
import NewRating from "./containers/SideMenu/NewRating";
import Settings from "./containers/SideMenu/Settings";
import Contact from "./containers/SideMenu/Contact";
import NotificationPage from "./containers/NotificationPage";
import PassengerProfile from "./containers/SideMenu/PassengerProfile";
import DriverProfile from "./containers/SideMenu/DriverProfile";
import RidesToConfirm from "./containers/SideMenu/RidesToConfirm";
import Legal from "./containers/SideMenu/Legal";
import Report from "./containers/SideMenu/Report";
import Language from "./containers/SideMenu/Language";

import Download from "./containers/Download";
import Donate from "./containers/Donate";
import Map from "./containers/Map";

import Help from "./containers/Help";
import Page404 from "./containers/Page404";
import ComingSoon from "./containers/ComingSoon";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Toasts from "./components/Toasts";
import MessageFee from "./components/MessageFee";

import {
  clearFeedback,
  // getNotifications,
  resetConversationView,
} from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  // if (isLoggedIn) dispatch(getNotifications(currentUser.id));

  useEffect(() => {
    history.listen((location) => {
      if (isLoggedIn) {
        dispatch(clearFeedback());
        // dispatch(getNotifications(currentUser.id));
        dispatch(resetConversationView(currentUser.id));
      } else {
        dispatch(clearFeedback());
      }
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

          <Route exact path="/login" component={LogIn} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/create-new-password/:uuid"
            component={CreateNewPassword}
          />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup-successful" component={SignUpSuccess} />
          <Route exact path="/confirm/:uuid" component={SignUpConfirm} />

          <Route exact path="/offer-ride" component={OfferRide} />
          <Route exact path="/find-ride" component={FindRide} />
          <Route exact path="/messages" component={MessagePage} />
          <Route exact path="/become-driver" component={BecomeDriver} />

          <Route exact path="/ride/:rideId" component={Ride} />
          <Route exact path="/rides" component={Rides} />
          <Route exact path="/rides/driver" component={RidesDriver} />
          <Route exact path="/rides/bookings" component={RidesBookings} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/booking/:bookingId" component={Booking} />

          <Route exact path="/menu" component={SideMenu} />
          <Route
            exact
            path="/profile/passenger/ratings"
            component={RatingsPassenger}
          />
          <Route
            exact
            path="/profile/driver/ratings"
            component={RatingsDriver}
          />
          <Route exact path="/ratings" component={Ratings} />
          <Route
            exact
            path="/ratings/new-rating/:rideId"
            component={NewRating}
          />
          <Route exact path="/profile/passenger" component={PassengerProfile} />
          <Route
            exact
            path="/rides/rides-to-confirm"
            component={RidesToConfirm}
          />
          <Route exact path="/profile/driver" component={DriverProfile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/notifications" component={NotificationPage} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/download" component={Download} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/legal" component={Legal} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/language" component={Language} />

          <Route exact path="/coming-soon" component={ComingSoon} />

          <Route component={Page404} />
        </Switch>

        <Footer />
        <Toasts />
      </Router>
    </Suspense>
  );
}

export default App;
