import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button, Container, Row, Col } from "react-bootstrap";
import {
  SearchIcon,
  PlusCircleIcon,
  CommentDiscussionIcon,
  PersonIcon,
  ZapIcon,
  ThreeBarsIcon,
  HomeIcon,
} from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

function NavigationBar() {
  const { t } = useTranslation();

  const { user: currentUser } = useSelector((state) => state.user);
  const { driverNewRidesRequestsData, passengerBookingsResponsesData } =
    useSelector((state) => state.notification);
  const { userNewMessagesData } = useSelector((state) => state.message);

  var notifications =
    driverNewRidesRequestsData.count + passengerBookingsResponsesData.count;
  var messages = userNewMessagesData.count;

  return currentUser ? (
    <Navbar bg="white" variant="light" fixed="bottom" className="pt-0">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-evenly align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/find" href="/find" className="px-0">
                  <Nav.Link className="text-center">
                    <SearchIcon size={24} className="mb-1" />
                    <p className="text-icon-nav-bar mb-0">
                      {t("navigationBar.find")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/offer" href="/offer" className="px-0">
                  <Nav.Link className="text-center">
                    <PlusCircleIcon size={24} className="mb-1" />
                    <p className="text-icon-nav-bar mb-0">
                      {t("navigationBar.offer")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/rides" href="/rides" className="px-0">
                  <Nav.Link className="text-center text-decoration-none">
                    <ZapIcon size={24} className="mb-1" />
                    <p className="text-icon-nav-bar mb-0">
                      {t("navigationBar.rides")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer
                  to="/messages"
                  href="/messages"
                  className="px-0"
                >
                  <Nav.Link>
                    <div className="position-relative">
                      <CommentDiscussionIcon size={24} className="mb-1" />
                      <p className="text-icon-nav-bar mb-0">
                        {t("navigationBar.messages")}
                        {messages > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {messages}
                            <span className="visually-hidden">
                              unread notification(s)
                            </span>
                          </span>
                        ) : null}
                      </p>
                      <p className="text-icon-nav-bar d-xs-screen mb-0">
                        {messages > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {messages}
                            <span className="visually-hidden">
                              unread messages
                            </span>
                          </span>
                        ) : null}
                      </p>
                    </div>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/menu" href="/menu" className="px-0">
                  <Nav.Link>
                    <div className="position-relative">
                      <PersonIcon size={24} className="mb-1" />
                      <p className="text-icon-nav-bar mb-0">
                        {t("navigationBar.account")}
                        {notifications > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {notifications}
                            <span className="visually-hidden">
                              unread notification(s)
                            </span>
                          </span>
                        ) : null}
                      </p>
                      <p className="text-icon-nav-bar d-xs-screen mb-0">
                        {notifications > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
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
              </Col>
            </Row>
          </Container>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Navbar.Collapse id="navigation-bar">
        <Nav className="w-100 justify-content-around align-items-center">
          <IndexLinkContainer to="/" href="/">
            <Nav.Link className="text-center">
              <HomeIcon size={24} />
              <p className="text-icon-nav-bar d-md-screen mt-1 mb-0">
                {t("navigationBar.home")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
          <div className="d-inline-flex">
            <IndexLinkContainer to="/login" href="/login">
              <Nav.Link className="text-center">
                <Button variant="outline-success" size="lg">
                  {t("navigationBar.logIn")}
                </Button>
              </Nav.Link>
            </IndexLinkContainer>

            <IndexLinkContainer to="/signup" href="/signup">
              <Nav.Link className="text-center">
                <Button variant="success" size="lg">
                  {t("navigationBar.signUp")}
                </Button>
              </Nav.Link>
            </IndexLinkContainer>
          </div>

          <IndexLinkContainer to="/menu" href="/menu">
            <Nav.Link className="text-center">
              <ThreeBarsIcon size={24} />
              <p className="text-icon-nav-bar d-lg-screen mb-0">
                {t("navigationBar.menu")}
              </p>
            </Nav.Link>
          </IndexLinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// @ts-ignore
export default NavigationBar;
