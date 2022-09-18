import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

// Error handling
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./containers/ErrorFallback";

// Loading Containers
import LogIn from "./containers/User/LogIn";
import ForgotPassword from "./containers/User/ForgotPassword";
import CreateNewPassword from "./containers/User/CreateNewPassword";
import SignUp from "./containers/User/SignUp";
import SignUpSuccess from "./containers/User/SignUpSuccess";
import SignUpConfirm from "./containers/User/SignUpConfirm";

import Fallback from "./containers/Fallback";
import Home from "./containers/Home";
import Find from "./containers/Find";
import Messages from "./containers/Messages";

import Ride from "./containers/Ride";
import Rides from "./containers/Rides";
import RidesDriver from "./containers/Rides/RidesDriver";
import RidesBookings from "./containers/Rides/RidesBookings";
import RidesToConfirm from "./containers/Rides/RidesToConfirm";

import Bookings from "./containers/Bookings";
import Booking from "./containers/Booking";
import Book from "./containers/Book";

import Offer from "./containers/Offer";
import HowItWorks from "./containers/HowItWorks";

import BecomeDriver from "./containers/BecomeDriver";
import DriverApplication from "./containers/DriverApplication";

// All pages included in the side menu
import Menu from "./containers/Menu/Menu";
import Notifications from "./containers/Menu/Notifications";
import Account from "./containers/Menu/Account";
import Profile from "./containers/Menu/Profile";
import Language from "./containers/Menu/Language";
import Report from "./containers/Menu/Report";
import FAQ from "./containers/Menu/FAQ";
import Hiring from "./containers/Menu/Hiring";
import Contact from "./containers/Menu/Contact";
import Donate from "./containers/Donate";
import Map from "./containers/Menu/Map";
import Help from "./containers/Help";
import Page404 from "./containers/Page404";
import ComingSoon from "./containers/ComingSoon";

// Legal
import Legal from "./containers/Menu/Legal";
import Privacy from "./containers/Menu/Privacy";
import RefundPolicy from "./containers/Menu/RefundPolicy";
import LegalNotice from "./containers/Menu/LegalNotice";
import TermsConditions from "./containers/Menu/TermsConditions";
import DataProtection from "./containers/Menu/DataProtection";
import Credits from "./containers/Menu/Credits";

// Verification
import Verification from "./containers/Menu/Verification";
import DriverVerification from "./containers/Menu/DriverVerification";
import PassengerVerification from "./containers/Menu/PassengerVerification";

// Rating
import NewRating from "./containers/Menu/NewRating";
import RatingsPassenger from "./containers/Menu/RatingsPassenger";
import RatingsDriver from "./containers/Menu/RatingsDriver";
import Ratings from "./containers/Menu/Ratings";

// Public Profile
import PassengerProfile from "./containers/PassengerProfile";
import DriverProfile from "./containers/DriverProfile";

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
  const { isNavBar } = useSelector((state) => state.global);

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
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <ScrollToTop />
          {isNavBar ? <NavigationBar /> : null}

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
            <Route exact path="/apply-driver" component={DriverApplication} />

            <Route exact path="/ride/:rideId" component={Ride} />
            <Route exact path="/rides" component={Rides} />
            <Route exact path="/rides/driver" component={RidesDriver} />
            <Route exact path="/rides/bookings" component={RidesBookings} />
            <Route exact path="/bookings" component={Bookings} />
            <Route exact path="/booking/:bookingId" component={Booking} />
            <Route exact path="/book/:rideId" component={Book} />

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
            <Route exact path="/account" component={Account} />
            <Route
              exact
              path="/rides/rides-to-confirm"
              component={RidesToConfirm}
            />
            <Route exact path="/profile/" component={Profile} />
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
            <Route exact path="/how-it-works" component={HowItWorks} />
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/hiring" component={Hiring} />

            {/* Verification */}
            <Route exact path="/verification" component={Verification} />
            <Route
              exact
              path="/passenger-verification"
              component={DriverVerification}
            />
            <Route
              exact
              path="/driver-verification"
              component={PassengerVerification}
            />

            {/* Public profile */}
            <Route exact path="/driver/:username" component={DriverProfile} />
            <Route
              exact
              path="/passenger/:username"
              component={PassengerProfile}
            />

            <Route exact path="/coming-soon" component={ComingSoon} />

            <Route component={Page404} />
          </Switch>

          <Toasts />
        </ErrorBoundary>
      </Router>
    </Suspense>
  );
}

export default App;
