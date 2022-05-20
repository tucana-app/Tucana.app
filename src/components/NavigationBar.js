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
                      {t("translation:navigationBar.find")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/offer" href="/offer" className="px-0">
                  <Nav.Link className="text-center">
                    <PlusCircleIcon size={24} className="mb-1" />
                    <p className="text-icon-nav-bar mb-0">
                      {t("translation:navigationBar.offer")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/rides" href="/rides" className="px-0">
                  <Nav.Link className="text-center text-decoration-none">
                    <ZapIcon size={24} className="mb-1" />
                    <p className="text-icon-nav-bar mb-0">
                      {t("translation:navigationBar.rides")}
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
                        {t("translation:navigationBar.messages")}
                        {messages > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {messages}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-icon-nav-bar d-xs-screen mb-0">
                        {messages > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {messages}
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
                        {t("translation:navigationBar.account")}
                        {notifications > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {notifications}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-icon-nav-bar d-xs-screen mb-0">
                        {notifications > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {notifications}
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
        <Nav className="w-100 justify-content-center align-items-center">
          <Container>
            <Row>
              <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                <Container className="px-0">
                  <Row className="align-items-center">
                    <Col xs={2} className="text-center mx-auto">
                      <IndexLinkContainer to="/" href="/">
                        <Nav.Link>
                          <HomeIcon size={24} />
                          <p className="text-icon-nav-bar d-md-screen mt-1 mb-0">
                            {t("translation:navigationBar.home")}
                          </p>
                        </Nav.Link>
                      </IndexLinkContainer>
                    </Col>
                    <Col xs="auto" className="text-center mx-auto">
                      <div className="d-inline-flex">
                        <IndexLinkContainer to="/login" href="/login">
                          <Nav.Link>
                            <Button variant="outline-success" size="lg">
                              {t("translation:navigationBar.logIn")}
                            </Button>
                          </Nav.Link>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/signup" href="/signup">
                          <Nav.Link>
                            <Button variant="success" size="lg">
                              {t("translation:navigationBar.signUp")}
                            </Button>
                          </Nav.Link>
                        </IndexLinkContainer>
                      </div>
                    </Col>
                    <Col xs={2} className="text-center mx-auto">
                      <IndexLinkContainer to="/menu" href="/menu">
                        <Nav.Link>
                          <ThreeBarsIcon size={24} />
                          <p className="text-icon-nav-bar d-md-screen mt-1 mb-0">
                            {t("translation:navigationBar.menu")}
                          </p>
                        </Nav.Link>
                      </IndexLinkContainer>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// @ts-ignore
export default NavigationBar;
