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
import Find from "./containers/Find";
import Messages from "./containers/Messages";

import Ride from "./containers/Ride";
import Rides from "./containers/Rides";
import RidesDriver from "./containers/Rides/RidesDriver";
import RidesBookings from "./containers/Rides/RidesBookings";
import Bookings from "./containers/Bookings";
import Booking from "./containers/Booking";
import Offer from "./containers/Offer";
import HowItWorks from "./containers/HowItWorks";

import BecomeDriver from "./containers/BecomeDriver";

// All pages included in the side menu
import Menu from "./containers/Menu/Menu";
import RatingsPassenger from "./containers/Menu/RatingsPassenger";
import RatingsDriver from "./containers/Menu/RatingsDriver";
import Ratings from "./containers/Menu/Ratings";
import NewRating from "./containers/Menu/NewRating";
import Contact from "./containers/Menu/Contact";
import Notifications from "./containers/Menu/Notifications";
import PassengerProfile from "./containers/Menu/PassengerProfile";
import DriverProfile from "./containers/Menu/DriverProfile";
import RidesToConfirm from "./containers/Menu/RidesToConfirm";
import Legal from "./containers/Menu/Legal";
import Report from "./containers/Menu/Report";
import Language from "./containers/Menu/Language";
import Credits from "./containers/Menu/Credits";
import Privacy from "./containers/Menu/Privacy";
import RefundPolicy from "./containers/Menu/RefundPolicy";
import LegalNotice from "./containers/Menu/LegalNotice";
import TermsConditions from "./containers/Menu/TermsConditions";
import DataProtection from "./containers/Menu/DataProtection";
import FAQ from "./containers/Menu/FAQ";

import Donate from "./containers/Donate";
import Map from "./containers/Map";

import Help from "./containers/Help";
import Page404 from "./containers/Page404";
import ComingSoon from "./containers/ComingSoon";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import ScrollToTop from "./components/ScrollToTop";
import Toasts from "./components/Toasts";

import { resetConversationView } from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";

function App() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    history.listen((location) => {
      if (isLoggedIn) {
        dispatch(resetConversationView(currentUser.id));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<Fallback />}>
      <Router history={history}>
        <ScrollToTop />
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

          <Route exact path="/offer" component={Offer} />
          <Route exact path="/find" component={Find} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/become-driver" component={BecomeDriver} />

          <Route exact path="/ride/:rideId" component={Ride} />
          <Route exact path="/rides" component={Rides} />
          <Route exact path="/rides/driver" component={RidesDriver} />
          <Route exact path="/rides/bookings" component={RidesBookings} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/booking/:bookingId" component={Booking} />

          <Route exact path="/menu" component={Menu} />
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
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/donate" component={Donate} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/legal" component={Legal} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/language" component={Language} />
          <Route exact path="/credits" component={Credits} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/refund-policy" component={RefundPolicy} />
          <Route exact path="/legal-notice" component={LegalNotice} />
          <Route exact path="/terms" component={TermsConditions} />
          <Route exact path="/data-protection" component={DataProtection} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/how-it-works" component={HowItWorks} />

          <Route exact path="/coming-soon" component={ComingSoon} />

          <Route component={Page404} />
        </Switch>

        <Toasts />
      </Router>
    </Suspense>
  );
}

export default App;
