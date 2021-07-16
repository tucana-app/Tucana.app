import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCarAlt,
  faUser,
  faPlusCircle,
  faSearch,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function NavigationBar() {
  const { user: currentUser } = useSelector((state) => state.user);

  const { t } = useTranslation();

  return currentUser ? (
    <Navbar bg="white" variant="light" fixed="bottom">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-baseline">
          <IndexLinkContainer to="/dashboard" href="/dashboard">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faTachometerAlt} size="lg" />
              <p className="displayLargeScreens mb-0">
                {t("translation:navigationbar.dashboard")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="/find-ride" href="/find-ride">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faSearch} size="lg" />
              <p className="displayLargeScreens mb-0">
                {t("translation:navigationbar.findRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="/my-rides" href="/my-rides">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faCarAlt} size="2x" />
              <p className="displayLargeScreens mb-0">
                {t("translation:navigationbar.myRides")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="/offer-ride" href="/offer-ride">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faPlusCircle} size="lg" />
              <p className="displayLargeScreens mb-0">
                {t("translation:navigationbar.offerRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <IndexLinkContainer to="/my-account" href="/my-account">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <p className="displayLargeScreens mb-0">
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
              <FontAwesomeIcon icon={faHome} size="lg" />
              <p className="displayLargeScreens mb-0">
                {t("translation:navigationbar.home")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <div className="d-inline-flex">
            <IndexLinkContainer to="/login" href="/login">
              <Nav.Link className="font-title text-center">
                <Button
                  className="font-title rounded-0"
                  size="lg"
                  variant="outline-success"
                >
                  {t("translation:homePage.logIn")}
                </Button>
              </Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to="/signup" href="/signup">
              <Nav.Link className="font-title text-center">
                <Button
                  className="font-title rounded-0"
                  size="lg"
                  variant="success"
                >
                  {t("translation:homePage.signUp")}
                </Button>
              </Nav.Link>
            </IndexLinkContainer>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// @ts-ignore
export default NavigationBar;
