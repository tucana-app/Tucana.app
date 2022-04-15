import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faComments, faUser } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

import logo_nav_bar from "../assets/images/logo_nav_bar.png";

function NavigationBar() {
  // const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { driverNewRidesRequestsData, passengerBookingsResponsesData } =
    useSelector((state) => state.notification);
  const { userNewMessagesData } = useSelector((state) => state.message);

  var notifications =
    driverNewRidesRequestsData.count + passengerBookingsResponsesData.count;
  var messages = userNewMessagesData.count;

  const { t } = useTranslation();

  return currentUser ? (
    <Navbar bg="white" variant="light" fixed="bottom" className="py-md-0">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-evenly align-items-center">
          <IndexLinkContainer to="/find-ride" href="/find-ride">
            <Nav.Link className="font-title text-center ps-0">
              <FontAwesomeIcon
                icon={faSearch}
                size="5x"
                className="icon-nav-bar"
              />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.findRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/offer-ride" href="/offer-ride">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faPlus} className="icon-nav-bar" />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.offerRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/my-rides" href="/my-rides">
            <Nav.Link className="font-title text-center text-decoration-none">
              <img
                src={logo_nav_bar}
                alt="R.CR"
                className="icon-brand-nav-bar mb-1"
              />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.myRides")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/messages" href="/messages">
            <Nav.Link className="font-title text-center">
              <div className="position-relative">
                <FontAwesomeIcon icon={faComments} className="icon-nav-bar" />
                <p className="small d-md-screen mb-0">
                  Messages
                  {messages > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {messages}
                      <span className="visually-hidden">
                        unread notification(s)
                      </span>
                    </span>
                  ) : null}
                </p>
                <p className="small d-xs-screen mb-0">
                  {messages > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {messages}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : null}
                </p>
              </div>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/menu" href="/menu">
            <Nav.Link className="font-title text-center">
              <div className="position-relative">
                <FontAwesomeIcon icon={faUser} className="icon-nav-bar" />
                <p className="small d-md-screen mb-0">
                  {t("translation:navigationbar.myAccount")}
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
                      <span className="visually-hidden">
                        unseen notification
                      </span>
                    </span>
                  ) : null}
                </p>
              </div>
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
                src={logo_nav_bar}
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