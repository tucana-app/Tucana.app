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
  faBell,
  faUserCircle,
  faStar,
  // faCheckCircle,
  // faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

import { logout } from "../../redux";

// Importing assets
import logo from "../../assets/images/OPTI_noir.png";

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

    if (
      numberPassengerBookingsResponses &&
      numberDriverNewRidesRequests !== undefined
    ) {
      notifications =
        numberDriverNewRidesRequests + numberPassengerBookingsResponses;
    }
  }

  const logOut = () => {
    history.push("/");
    dispatch(logout());
  };

  return (
    <Container fluid className="p-0" data-aos="slide-right">
      <ListGroup variant="flush">
        {isLoggedIn ? (
          <>
            <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
              <div className="text-center py-2">
                <Link
                  to="/my-profile/passenger"
                  className="text-decoration-none"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-secondary mb-1"
                    size={"5x"}
                  />
                </Link>
                <p className="h3 mb-0">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="lead">{currentUser.email}</p>

                <p className="small text-secondary mb-0">
                  Member since {dateFormat(currentUser.createdAt, "yyyy")}
                </p>

                {/* Driver's profile verified? */}
                {/* <p className="lead mb-0">
              {currentUser.Driver && currentUser.Driver.verified ? (
                <span>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-success me-2"
                  />
                  Driver's profile verified
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-danger me-2"
                  />
                  Driver's profile unverified
                </span>
              )}
            </p> */}
                {/* Phone number verified? */}
                {/* <p className="lead">
              {currentUser.phoneNumber && currentUser.phoneConfirmed ? (
                <span>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-success me-2"
                  />
                  Phone number verified
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-danger me-2"
                  />
                  Phone number not verified
                </span>
              )}
            </p> */}
              </div>
            </ListGroup.Item>

            <Link to="/my-profile/passenger" className="text-decoration-none">
              <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon icon={faUserFriends} className="me-2" /> My
                    profile
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            {currentUser.Driver && currentUser.Driver.verified ? (
              <Link to="/my-profile/driver" className="text-decoration-none">
                <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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
              <Link to="/coming-soon" className="text-decoration-none">
                <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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

            <Link to="/notifications" className="text-decoration-none">
              <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-success me-3"
                    />{" "}
                    Notifications
                    <Badge bg="danger" className="align-text-top ms-2">
                      {notifications}
                    </Badge>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/ratings" className="text-decoration-none">
              <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-warning me-3"
                    />{" "}
                    Ratings
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/settings" className="text-decoration-none">
              <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span>
                    <FontAwesomeIcon icon={faCog} className="text-info me-3" />{" "}
                    Settings
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-decoration-none">
              <ListGroup.Item className="text-center border border-top-0 border-start-0 border-end-0 py-4">
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

            <Link to="/login" className="text-decoration-none">
              <ListGroup.Item className="border border-start-0 border-end-0 ">
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

            <Link to="/signup" className="text-decoration-none">
              <ListGroup.Item className="border border-start-0 border-end-0 ">
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

        {isLoggedIn ? (
          <div onClick={logOut} className="text-decoration-none cursor-pointer">
            <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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

        <hr className="w-75 text-white mx-auto my-4" />

        <Link to="/download" className="text-decoration-none">
          <ListGroup.Item className="border border-start-0 border-end-0 ">
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

        <Link to="/help" className="text-decoration-none">
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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

        <Link to="/contact" className="text-decoration-none">
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon icon={faEnvelope} className="me-3" /> Contact
                us
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/coming-soon" className="text-decoration-none">
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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

        <Link to="/donate" className="text-decoration-none">
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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

        <Link to="/coming-soon" className="text-decoration-none">
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
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

        <hr className="w-75 text-white mx-auto my-4" />

        {currentUser && currentUser.adminId ? (
          <>
            <Link to="/admin/dashboard" className="text-decoration-none">
              <ListGroup.Item className="border border-start-0 border-end-0 ">
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
