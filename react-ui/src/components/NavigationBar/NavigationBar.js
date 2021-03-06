import React from "react";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import DropdownLanguage from "../DropdownLanguage/DropdownLanguage";

const NavigationBar = ({ onClick, lg }) => {
  return (
    <Navbar bg="light" expand="md" variant="light" fixed="top">
      <Navbar.Brand href="/" className="mx-auto">
        <img
          alt=""
          src="./assets/images/logo.png"
          className="navbar-brand"
          width="250px"
        />
      </Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse id="navigation-bar" className="text-center">
        <Nav className="mx-auto">
          <IndexLinkContainer to="/" href="/">
            <Nav.Link>Home</Nav.Link>
          </IndexLinkContainer>

          <NavDropdown title="The Academy" id="dropdown-menu-1">
            {/* <IndexLinkContainer to="/about-us" href="/about-us"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>About us</NavDropdown.Item>
            </IndexLinkContainer>
            <IndexLinkContainer to="/the-staff" href="/the-staff">
              <NavDropdown.Item>The staff</NavDropdown.Item>
            </IndexLinkContainer>
            <IndexLinkContainer to="/arrivals" href="/arrivals">
              <NavDropdown.Item>Arrivals</NavDropdown.Item>
            </IndexLinkContainer>
            <IndexLinkContainer to="/gallery" href="/gallery">
              <NavDropdown.Item>Gallery</NavDropdown.Item>
            </IndexLinkContainer>
            {/* <IndexLinkContainer to="/explore-around" href="/explore-around"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>Explore around</NavDropdown.Item>
            </IndexLinkContainer>
            {/* <IndexLinkContainer to="/partners" href="/partners"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>Partners</NavDropdown.Item>
            </IndexLinkContainer>
          </NavDropdown>

          <NavDropdown title="The Program" id="dropdown-menu-2">
            {/* <IndexLinkContainer to="/the-program" href="/the-program"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>About the program</NavDropdown.Item>
            </IndexLinkContainer>
            {/* <IndexLinkContainer to="/accomodation" href="/accomodation"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>Accomodation</NavDropdown.Item>
            </IndexLinkContainer>
            {/* <IndexLinkContainer to="/food" href="/food"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>The food</NavDropdown.Item>
            </IndexLinkContainer>
            {/* <IndexLinkContainer to="/faq" href="/faq"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>FAQ</NavDropdown.Item>
            </IndexLinkContainer>
            {/* <IndexLinkContainer to="/testimonials" href="/testimonials"> */}
            <IndexLinkContainer to="/" href="/" disabled>
              <NavDropdown.Item>Testimonials</NavDropdown.Item>
            </IndexLinkContainer>
          </NavDropdown>

          <IndexLinkContainer to="/contact" href="/contact">
            <Nav.Link>Contact</Nav.Link>
          </IndexLinkContainer>

          <IndexLinkContainer to="/" href="/" disabled>
            {/* <IndexLinkContainer to="/covid-19" href="/covid-19"> */}
            <Nav.Link>Covid 19</Nav.Link>
          </IndexLinkContainer>
        </Nav>
        <DropdownLanguage onClick={onClick} lg={lg} />
      </Navbar.Collapse>
    </Navbar>
  );
};

// @ts-ignore
export default NavigationBar;
