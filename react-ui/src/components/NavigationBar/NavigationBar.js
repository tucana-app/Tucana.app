import React, { Component } from "react";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";
import DropdownLanguage from "../DropdownLanguage/DropdownLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faPlusCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";

class NavigationBar extends Component {
  render() {
    const { t, onClick, lg } = this.props;
    return (
      <Navbar
        bg="dark"
        expand="md"
        variant="dark"
        fixed="top"
        className="justify-content-around"
      >
        <Navbar.Brand href="/" className="mx-auto">
          <img
            alt=""
            src="./assets/images/logo.jpg"
            className="navbar-brand"
            width="128"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse
          id="navigation-bar"
          className="text-center justify-content-around"
        >
          <Nav>
            <IndexLinkContainer to="/" href="/">
              <Nav.Link>Home</Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/find-ride" href="/find-ride">
              <Nav.Link>
                <FontAwesomeIcon icon={faSearch} />{" "}
                {t("translation:navigationbar.findRide")}
              </Nav.Link>
            </IndexLinkContainer>
            <IndexLinkContainer to="/offer-ride" href="/offer-ride">
              <Nav.Link>
                <FontAwesomeIcon icon={faPlusCircle} />{" "}
                {t("translation:navigationbar.offerRide")}
              </Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/covid19" href="/covid19">
              <Nav.Link>
                <FontAwesomeIcon icon={faExclamationCircle} /> Covid 19
              </Nav.Link>
            </IndexLinkContainer>
          </Nav>
          <Nav className="justify-content-left">
            <IndexLinkContainer
              to="/login"
              href="/login"
              className="btn-success hvr-glow"
            >
              <Nav.Link>{t("translation:navigationbar.logIn")}</Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer
              to="/signup"
              href="/signup"
              className="btn-outline-success"
            >
              <Nav.Link>{t("translation:navigationbar.signUp")}</Nav.Link>
            </IndexLinkContainer>
          </Nav>
          <Nav>
            <DropdownLanguage
              onClick={onClick}
              lg={lg}
              className="justify-content-end"
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

// @ts-ignore
export default withTranslation()(NavigationBar);
