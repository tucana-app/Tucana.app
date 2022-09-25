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
import DriverRides from "./containers/Driver/DriverRides";
import DriverBookings from "./containers/Driver/DriverBookings";
import DriverPastRides from "./containers/Driver/DriverPastRides";
import DriverPastBookings from "./containers/Driver/DriverPastBookings";
import DriverProfile from "./containers/Driver/DriverProfile";
import DriverCar from "./containers/Driver/DriverCar";

import Bookings from "./containers/Bookings";
import Booking from "./containers/Booking";
import Book from "./containers/Book";
import UserPastBookings from "./containers/UserPastBookings";
import RidesToConfirm from "./containers/RidesToConfirm";
import ConfirmRide from "./containers/ConfirmRide";

import Publish from "./containers/Publish";
import HowItWorks from "./containers/HowItWorks";

import BecomeDriver from "./containers/BecomeDriver";
import DriverApplication from "./containers/Driver/DriverApplication";

// All pages included in the side menu
import Menu from "./containers/Menu/Menu";
import Notifications from "./containers/Menu/Notifications";
import Account from "./containers/Menu/Account";
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

// Edits
import EditBio from "./containers/Edits/EditBio";

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
import PassengerPublicProfile from "./containers/PassengerPublicProfile";
import DriverPublicProfile from "./containers/Driver/DriverPublicProfile";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import ScrollToTop from "./components/ScrollToTop";
import Toasts from "./components/Toasts";

import { resetConversationView, getNotifications } from "./redux";
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

    let interval = null;

    interval = setInterval(() => {
      if (isLoggedIn) {
        dispatch(getNotifications(currentUser));
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };

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

            <Route exact path="/publish" component={Publish} />
            <Route exact path="/find" component={Find} />
            <Route exact path="/messages" component={Messages} />
            <Route exact path="/become-driver" component={BecomeDriver} />
            <Route exact path="/apply-driver" component={DriverApplication} />

            <Route exact path="/ride/:rideId" component={Ride} />
            <Route exact path="/rides" component={Rides} />
            <Route exact path="/driver/rides" component={DriverRides} />
            <Route exact path="/driver/bookings" component={DriverBookings} />
            <Route exact path="/driver/car" component={DriverCar} />
            <Route exact path="/bookings" component={Bookings} />
            <Route exact path="/booking/:bookingId" component={Booking} />
            <Route exact path="/book/:rideId" component={Book} />
            <Route exact path="/past-bookings" component={UserPastBookings} />
            <Route
              exact
              path="/driver/past-rides"
              component={DriverPastRides}
            />
            <Route
              exact
              path="/driver/past-bookings"
              component={DriverPastBookings}
            />

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
            <Route exact path="/ride/confirm/:rideId" component={ConfirmRide} />
            <Route exact path="/profile/" component={DriverProfile} />
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

            <Route exact path="/edit/bio" component={EditBio} />

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
            <Route
              exact
              path="/driver/:username"
              component={DriverPublicProfile}
            />
            <Route
              exact
              path="/passenger/:username"
              component={PassengerPublicProfile}
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
