import React, { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import useWindowDimensions from "./hooks/useWindowDimensions";

// Download link
import DownloadRedirect from "./DownloadRedirect";

// User Containers
import Account from "./containers/User/Account";
import CloseAccount from "./containers/User/CloseAccount";
import CreateNewPassword from "./containers/User/CreateNewPassword";
import Experience from "./containers/User/Experience";
import ForgotPassword from "./containers/User/ForgotPassword";
import LogIn from "./containers/User/LogIn";
import PublicProfile from "./containers/User/PublicProfile";
import PublicRatings from "./containers/User/PublicRatings";
import SignUp from "./containers/User/SignUp";
import SignUpConfirm from "./containers/User/SignUpConfirm";
import SignUpSuccess from "./containers/User/SignUpSuccess";

// Ride containers
import ConfirmRide from "./containers/Ride/ConfirmRide";
import Find from "./containers/Ride/Find";
import Publish from "./containers/Ride/Publish";
import Ride from "./containers/Ride/Ride";
import Rides from "./containers/Ride/Rides";
import RidesToConfirm from "./containers/Ride/RidesToConfirm";

// Bookings containers
import Booking from "./containers/Booking/Booking";
import Bookings from "./containers/Booking/Bookings";
import Book from "./containers/Booking/Book";
import CancelBooking from "./containers/Booking/CancelBooking";
import PastBookings from "./containers/Booking/PastBookings";

// Driver containers
import BecomeDriver from "./containers/Driver/BecomeDriver";
import DriverApplication from "./containers/Driver/DriverApplication";
import DriverApplicationForm from "./containers/Driver/DriverApplicationForm";
import DriverBookings from "./containers/Driver/DriverBookings";
import DriverCar from "./containers/Driver/DriverCar";
import DriverPastBookings from "./containers/Driver/DriverPastBookings";
import DriverPastRides from "./containers/Driver/DriverPastRides";
import DriverProfile from "./containers/Driver/DriverProfile";
import DriverRides from "./containers/Driver/DriverRides";

// Edits containers
import EditBio from "./containers/Edits/EditBio";
import EditDateOfBirth from "./containers/Edits/EditDateOfBirth";
import EditPassword from "./containers/Edits/EditPassword";

// Help containers
import FAQ from "./containers/Help/FAQ";
import Help from "./containers/Help/Help";
import HowItWorks from "./containers/Help/HowItWorks";
import Map from "./containers/Help/Map";
import RefundPolicy from "./containers/Help/RefundPolicy";

// Legal containers
import Credits from "./containers/Legal/Credits";
import DataProtection from "./containers/Legal/DataProtection";
import Legal from "./containers/Legal/Legal";
import LegalNotice from "./containers/Legal/LegalNotice";
import Privacy from "./containers/Legal/Privacy";
import TermsConditions from "./containers/Legal/TermsConditions";

// Menu containers
import Contact from "./containers/Menu/Contact";
import Donate from "./containers/Menu/Donate";
import Hiring from "./containers/Menu/Hiring";
import Language from "./containers/Menu/Language";
import Notifications from "./containers/Menu/Notifications";

// Rating containers
import NewRating from "./containers/Rating/NewRating";
import Ratings from "./containers/Rating/Ratings";
import RatingsDriver from "./containers/Rating/RatingsDriver";
import RatingsPassenger from "./containers/Rating/RatingsPassenger";

// Report containers
import Report from "./containers/Report/Report";

// Message containers
import Messages from "./containers/Message/Messages";

// Other
import Home from "./containers/Home";
import Menu from "./containers/Menu";
import ComingSoon from "./components/ComingSoon";

// Error containers
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./containers/Error/ErrorFallback";
import OfflineBanner from "./containers/Error/OfflineBanner";
import Fallback from "./containers/Error/Fallback";
import Page404 from "./containers/Error/Page404";

// Loading Components
import NavigationBar from "./components/NavigationBar";
import ScrollToTop from "./components/ScrollToTop";
import Toasts from "./components/Toasts";

import {
  resetConversationView,
  getNotifications,
  displayNavBar,
  setGlobalState,
} from "./redux";
import { history } from "./helpers/history";

// Importing css for the whole app
import "./scss/app.scss";

import CacheBuster from "react-cache-buster";

function App() {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isNavBar, initHeight, isOffline } = useSelector(
    (state) => state.global
  );
  const { height } = useWindowDimensions();

  useEffect(() => {
    dispatch(setGlobalState(height));

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

  useEffect(() => {
    if (height <= initHeight - 200) {
      dispatch(displayNavBar(false));
    } else {
      dispatch(displayNavBar(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, initHeight]);

  const isProduction = process.env.NODE_ENV === "production";

  return (
    <CacheBuster
      currentVersion={global.appVersion}
      isEnabled={!isProduction} //If false, the library is disabled.
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      loadingComponent={<Fallback />} //If not pass, nothing appears at the time of new version check.
    >
      <Suspense fallback={<Fallback />}>
        <Router history={history}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
          >
            <ScrollToTop />
            {isOffline ? <OfflineBanner /> : null}
            {isNavBar ? <NavigationBar /> : null}

            <Switch>
              <Route exact path="/download" component={DownloadRedirect} />

              {/* User containers */}
              <Route exact path="/account" component={Account} />
              <Route exact path="/close-account" component={CloseAccount} />
              <Route
                exact
                path="/new-password/:uuid"
                component={CreateNewPassword}
              />
              <Route exact path="/experience" component={Experience} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/confirm/:uuid" component={SignUpConfirm} />
              <Route
                exact
                path="/signup-successful"
                component={SignUpSuccess}
              />
              <Route
                exact
                path="/profile/:username"
                component={PublicProfile}
              />
              <Route
                exact
                path="/profile/:username/ratings"
                component={PublicRatings}
              />

              {/* Ride containers */}
              <Route
                exact
                path="/ride/booking/:bookingId/confirm"
                component={ConfirmRide}
              />
              <Route exact path="/publish" component={Publish} />
              <Route exact path="/ride/:rideId" component={Ride} />
              <Route exact path="/rides" component={Rides} />
              <Route
                exact
                path="/rides/rides-to-complete"
                component={RidesToConfirm}
              />

              {/* Booking containers */}
              <Route exact path="/booking/:bookingId" component={Booking} />
              <Route exact path="/bookings" component={Bookings} />
              <Route exact path="/book/:rideId" component={Book} />
              <Route
                exact
                path="/booking/:bookingId/cancel"
                component={CancelBooking}
              />

              {/* Driver containers */}
              <Route exact path="/become-driver" component={BecomeDriver} />
              <Route
                exact
                path="/driver/application/:applicationId"
                component={DriverApplication}
              />
              <Route
                exact
                path="/apply-driver"
                component={DriverApplicationForm}
              />
              <Route exact path="/driver/bookings" component={DriverBookings} />
              <Route exact path="/driver/car" component={DriverCar} />
              <Route
                exact
                path="/driver/past-bookings"
                component={DriverPastBookings}
              />
              <Route
                exact
                path="/driver/past-rides"
                component={DriverPastRides}
              />
              <Route exact path="/profile/" component={DriverProfile} />
              <Route exact path="/driver/rides" component={DriverRides} />
              <Route exact path="/past-bookings" component={PastBookings} />

              {/* Edits containers */}
              <Route exact path="/edit/bio" component={EditBio} />
              <Route exact path="/edit/password" component={EditPassword} />
              <Route
                exact
                path="/edit/date-of-birth"
                component={EditDateOfBirth}
              />

              {/* Help container */}
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/how-it-works" component={HowItWorks} />
              <Route exact path="/map" component={Map} />
              <Route exact path="/refund-policy" component={RefundPolicy} />

              {/* Legal containers */}
              <Route exact path="/credits" component={Credits} />
              <Route exact path="/data-protection" component={DataProtection} />
              <Route exact path="/legal" component={Legal} />
              <Route exact path="/legal-notice" component={LegalNotice} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/terms" component={TermsConditions} />

              {/* Menu containers */}
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/donate" component={Donate} />
              <Route exact path="/hiring" component={Hiring} />
              <Route exact path="/language" component={Language} />
              <Route exact path="/notifications" component={Notifications} />

              {/* Rating container */}
              <Route
                exact
                path="/ratings/new-rating/:bookingId"
                component={NewRating}
              />
              <Route exact path="/ratings" component={Ratings} />
              <Route
                exact
                path="/profile/driver/ratings"
                component={RatingsDriver}
              />
              <Route
                exact
                path="/profile/passenger/ratings"
                component={RatingsPassenger}
              />

              {/* Report containers */}
              <Route exact path="/report" component={Report} />

              {/* Message containers */}
              <Route exact path="/messages" component={Messages} />

              {/* Other containers */}
              <Route exact path="/" component={Home} />
              <Route exact path="/find" component={Find} />
              <Route exact path="/menu" component={Menu} />
              <Route exact path="/coming-soon" component={ComingSoon} />

              <Route component={Page404} />
            </Switch>

            <Toasts />
          </ErrorBoundary>
        </Router>
      </Suspense>
    </CacheBuster>
  );
}

export default App;
