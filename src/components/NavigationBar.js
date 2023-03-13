import React from "react";
import { useSelector } from "react-redux";
import { IndexLinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import {
  SearchIcon,
  PlusCircleIcon,
  CommentDiscussionIcon,
  ZapIcon,
} from "@primer/octicons-react";
import { useTranslation } from "react-i18next";

function NavigationBar() {
  const { t } = useTranslation();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { driverNewRidesRequestsData } = useSelector(
    (state) => state.notification
  );
  const { userNewMessagesData } = useSelector((state) => state.message);
  const { ridesToConfirmData } = useSelector((state) => state.ride);
  const { getRatingsToDoDriverData, getRatingsToDoPassengerData } = useSelector(
    (state) => state.rating
  );
  const { srcAvatar } = useSelector((state) => state.global);

  var notificationsRides =
    driverNewRidesRequestsData.count + ridesToConfirmData.length;
  var notificationsMenu =
    getRatingsToDoDriverData.length + getRatingsToDoPassengerData.length;

  const messages = userNewMessagesData.count;

  return isLoggedIn ? (
    <Navbar bg="white" variant="light" fixed="bottom" className="py-0">
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
                <IndexLinkContainer
                  to="/publish"
                  href="/publish"
                  className="px-0"
                >
                  <Nav.Link className="text-center">
                    <PlusCircleIcon size={24} className="mb-1" />
                    <p className="text-icon-nav-bar mb-0">
                      {t("translation:navigationBar.publish")}
                    </p>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
              <Col xs={2} className="text-center mx-auto">
                <IndexLinkContainer to="/rides" href="/rides" className="px-0">
                  <Nav.Link>
                    <div className="position-relative">
                      <ZapIcon size={24} className="mb-1" />
                      <p className="text-icon-nav-bar mb-0">
                        {t("translation:navigationBar.rides")}
                        {notificationsRides > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {notificationsRides}
                          </span>
                        ) : null}
                      </p>
                    </div>
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
                          <span className="position-absolute top-0 translate-middle-y badge rounded-pill bg-danger">
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
                      <img
                        src={srcAvatar(currentUser)}
                        alt="Avatar"
                        className="img-fluid cursor-pointer avatar-img-xs border border-dark border-2 mb-1"
                      />
                      <p className="text-icon-nav-bar mb-0">
                        {t("translation:menu.account")}
                        {notificationsMenu > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {notificationsMenu}
                          </span>
                        ) : null}
                      </p>
                      {/* <p className="text-icon-nav-bar d-xs-screen mb-0">
                        {notifications > 0 ? (
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            {notifications}
                          </span>
                        ) : null}
                      </p> */}
                    </div>
                  </Nav.Link>
                </IndexLinkContainer>
              </Col>
            </Row>
          </Container>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  ) : null;
}

export default NavigationBar;
