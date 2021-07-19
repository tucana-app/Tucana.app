import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarAlt,
  faUser,
  faSearch,
  faHome,
  faBars,
  faComment,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function NavigationBar() {
  const { user: currentUser } = useSelector((state) => state.user);
  const { driverNewRidesRequestsData } = useSelector((state) => state.message);

  const { t } = useTranslation();

  return currentUser ? (
    <Navbar bg="white" variant="light" fixed="bottom" className="p-md-0">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-center my-2">
          <IndexLinkContainer to="/my-rides" href="/my-rides">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faCarAlt} size="lg" />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.myRides")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/find-ride" href="/find-ride">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faSearch} size="lg" />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.findRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/offer-ride" href="/offer-ride">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faPlusCircle} size="lg" />
              <p className="small d-md-screen mb-0">
                {t("translation:navigationbar.offerRide")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/messages" href="/messages">
            <Nav.Link className="font-title text-center">
              <div className="position-relative">
                <FontAwesomeIcon icon={faComment} size="lg" />
                <p className="small d-md-screen mb-0">
                  Messages
                  {driverNewRidesRequestsData.count > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {driverNewRidesRequestsData.count}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : null}
                </p>
                <p className="small d-xs-screen mb-0">
                  {driverNewRidesRequestsData.count > 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {driverNewRidesRequestsData.count}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : null}
                </p>
              </div>
            </Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/menu" href="/menu">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faUser} size="lg" />
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
              <FontAwesomeIcon icon={faHome} size="lg" />
              <p className="small d-lg-screen mb-0">
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

          <IndexLinkContainer to="/menu" href="/menu">
            <Nav.Link className="font-title text-center">
              <FontAwesomeIcon icon={faBars} size="lg" />
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
