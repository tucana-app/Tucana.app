import React, { Component } from "react";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCar,
  faUser,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";

class NavigationBar extends Component {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Navbar bg="light" variant="light" fixed="bottom">
          <Navbar.Collapse id="navigation-bar">
            <Nav className="w-100 justify-content-around align-items-baseline">
              <div className="">
                <IndexLinkContainer to="/dashboard" href="/dashboard">
                  <Nav.Link className="font-title text-center">
                    <FontAwesomeIcon icon={faTachometerAlt} size="2x" />
                    <p className="displayLargeScreens mb-0">
                      {t("translation:navigationbar.dashboard")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </div>
              <div className="">
                <IndexLinkContainer to="/find-ride" href="/find-ride">
                  <Nav.Link className="font-title text-center">
                    <FontAwesomeIcon icon={faSearch} size="2x" />
                    <p className="displayLargeScreens mb-0">
                      {t("translation:navigationbar.findRide")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </div>
              <div className="">
                <IndexLinkContainer to="/my-rides" href="/my-rides">
                  <Nav.Link className="font-title text-center">
                    <FontAwesomeIcon icon={faCar} size="2x" />
                    <p className="displayLargeScreens mb-0">
                      {t("translation:navigationbar.myRides")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </div>
              <div className="">
                <IndexLinkContainer to="/offer-ride" href="/offer-ride">
                  <Nav.Link className="font-title text-center">
                    <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                    <p className="displayLargeScreens mb-0">
                      {t("translation:navigationbar.offerRide")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </div>
              <div className="">
                <IndexLinkContainer to="/my-account" href="/my-account">
                  <Nav.Link className="font-title text-center">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                    <p className="displayLargeScreens mb-0">
                      {t("translation:navigationbar.myAccount")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

// @ts-ignore
export default withTranslation()(NavigationBar);
