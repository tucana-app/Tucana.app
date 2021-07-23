import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faBars,
  faPlusCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function NavigationBar() {
  const { user: currentUser } = useSelector((state) => state.user);
  const {
    isLoadingDriverNewRidesRequests,
    driverNewRidesRequestsData,
    isLoadingPassengerBookingsResponses,
    passengerBookingsResponsesData,
  } = useSelector((state) => state.notification);

  let notifications = 0;

  if (
    !isLoadingDriverNewRidesRequests &&
    !isLoadingPassengerBookingsResponses
  ) {
    const numberDriverNewRidesRequests = driverNewRidesRequestsData.count;
    const numberPassengerBookingsResponses =
      passengerBookingsResponsesData.count;

    notifications =
      numberDriverNewRidesRequests + numberPassengerBookingsResponses;
  }

  const { t } = useTranslation();

  return currentUser ? (
    <Navbar
      bg="white"
      variant="light"
      fixed="bottom"
      className="py-3 py-sm-2 py-md-0"
    >
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-center">
          <IndexLinkContainer to="/my-rides" href="/my-rides">
            <Nav.Link className="font-title text-center text-decoration-none">
              <img
                src="./assets/images/logo_nav_bar.png"
                alt="R.CR"
                className="icon-brand-nav-bar mb-1"
              />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.myRides")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/find-ride" href="/find-ride">
            <Nav.Link className="font-title text-center ps-0">
              <FontAwesomeIcon icon={faSearch} className="icon-nav-bar " />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.findRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/offer-ride" href="/offer-ride">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faPlusCircle} className="icon-nav-bar" />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.offerRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/notifications" href="/notifications">
            <Nav.Link className="font-title text-center">
              <div className="position-relative">
                <FontAwesomeIcon icon={faBell} className="icon-nav-bar" />
                <p className="small d-md-screen mb-0">
                  Notifications
                  {notifications > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications}
                      <span className="visually-hidden">
                        unread notification(s)
                      </span>
                    </span>
                  ) : null}
                </p>
                <p className="small d-xs-screen mb-0">
                  {notifications > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {notifications}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : null}
                </p>
              </div>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/menu" href="/menu">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faUser} className="icon-nav-bar" />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.myAccount")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-center">
          <IndexLinkContainer to="/" href="/">
            <Nav.Link className="font-title text-center">
              <img
                src="./assets/images/logo_nav_bar.png"
                alt="R.CR"
                className="icon-brand-nav-bar mb-1"
              />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.home")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <div className="d-inline-flex">
            <IndexLinkContainer to="/login" href="/login">
              <Nav.Link className="font-title text-center">
                <Button
                  className="font-title rounded-0"
                  variant="outline-success"
                  size="lg"
                >
                  {t("translation:homePage.logIn")}
                </Button>
              </Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/signup" href="/signup">
              <Nav.Link className="font-title text-center">
                <Button
                  className="font-title rounded-0"
                  variant="success"
                  size="lg"
                >
                  {t("translation:homePage.signUp")}
                </Button>
              </Nav.Link>
            </IndexLinkContainer>
          </div>

          <IndexLinkContainer to="/menu" href="/menu">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faBars} className="icon-nav-bar" />
              <p className="small d-lg-screen mb-0">Menu</p>
            </Nav.Link>
          </IndexLinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// @ts-ignore
export default NavigationBar;
