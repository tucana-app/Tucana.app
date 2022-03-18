import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faPowerOff,
  faCog,
  faLifeRing,
  faQuestionCircle,
  faScroll,
  faSignInAlt,
  faUserPlus,
  faDonate,
  faDownload,
  faEnvelope,
  faUserShield,
  faCar,
  faUserFriends,
  faList,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { logout } from "../../redux";

// Importing assets
import logo from "../../assets/images/OPTI_blanc.png";

const SideMenu = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const history = useHistory();
  const {
    isLoadingDriverNewRidesRequests,
    driverNewRidesRequestsData,
    isLoadingPassengerBookingsResponses,
    passengerBookingsResponsesData,
  } = useSelector((state) => state.notification);

  let notifications = 0;
  let numberDriverNewRidesRequests = 0;
  let numberPassengerBookingsResponses = 0;

  if (
    !isLoadingDriverNewRidesRequests &&
    !isLoadingPassengerBookingsResponses
  ) {
    numberDriverNewRidesRequests = driverNewRidesRequestsData.count;
    numberPassengerBookingsResponses = passengerBookingsResponsesData.count;

    notifications =
      numberDriverNewRidesRequests + numberPassengerBookingsResponses;
  }

  const logOut = () => {
    history.push("/");
    dispatch(logout());
  };

  return (
    <Container fluid className="p-0" data-aos="slide-right">
      <ListGroup variant="flush">
        <Link to="/" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-center border border-top-0 border-start-0 border-end-0 py-4">
            <div className="d-inline mx-auto">
              <img
                src={logo}
                alt="Ride.CR logo"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
            </div>
          </ListGroup.Item>
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/my-account" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faList}
                      className="text-success me-3"
                    />{" "}
                    My account
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link
              to="/notifications"
              className="text-light text-decoration-none"
            >
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-warning me-3"
                    />{" "}
                    Notifications
                    <Badge bg="danger" className="ms-2">
                      {notifications}
                    </Badge>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link
              to="/my-profile/passenger"
              className="text-light text-decoration-none"
            >
              <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faUserFriends}
                      className="text-light me-2"
                    />{" "}
                    My profile
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            {currentUser.Driver && currentUser.Driver.verified ? (
              <Link
                to="/my-profile/driver"
                className="text-light text-decoration-none"
              >
                <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                  <div className="d-inline-flex justify-content-between w-100 py-2">
                    <span>
                      <FontAwesomeIcon
                        icon={faCar}
                        className="text-secondary me-3"
                      />{" "}
                      My driver's profile
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </ListGroup.Item>
              </Link>
            ) : (
              <Link
                to="/coming-soon"
                className="text-light text-decoration-none"
              >
                <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
                  <div className="d-inline-flex justify-content-between w-100 py-2">
                    <span className="link-success fw-bold">
                      <FontAwesomeIcon icon={faCar} className="me-3" /> Become a
                      driver
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </ListGroup.Item>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      className="text-success me-3"
                    />{" "}
                    Login
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/signup" className="text-light text-decoration-none">
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-success me-3"
                    />{" "}
                    Signup
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>
          </>
        )}

        <Link to="/settings" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon icon={faCog} className="text-info me-3" />{" "}
                Settings
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        {isLoggedIn ? (
          <div
            onClick={logOut}
            className="text-light text-decoration-none cursor-pointer"
          >
            <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
              <div className="d-inline-flex justify-content-between w-100 py-2">
                <span>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className="text-danger me-3"
                  />{" "}
                  Log Out
                </span>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </ListGroup.Item>
          </div>
        ) : null}

        <hr className="w-75 bg-dark mx-auto my-4" />

        <Link to="/download" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-success me-3"
                />{" "}
                Download the App
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/help" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faLifeRing}
                  className="text-danger me-3"
                />{" "}
                Help
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/contact" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-light me-3"
                />{" "}
                Contact us
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/coming-soon" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="text-info me-3"
                />{" "}
                About Us
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/donate" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faDonate}
                  className="text-warning me-3"
                />{" "}
                Donate
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/coming-soon" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faScroll}
                  className="text-secondary me-2"
                />{" "}
                Terms &amp; Conditions
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <hr className="w-75 bg-dark mx-auto my-4" />
        {currentUser && currentUser.adminId ? (
          <>
            <Link
              to="/admin/dashboard"
              className="text-light text-decoration-none"
            >
              <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon icon={faUserShield} className="me-2" />{" "}
                    Admin
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>
          </>
        ) : null}
      </ListGroup>
    </Container>
  );
};

export default SideMenu;
