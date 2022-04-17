import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";
import { ChevronRightIcon, PersonIcon } from "@primer/octicons-react";
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
        {currentUser && !currentUser.adminId ? (
          <>
            {isLoggedIn ? (
              <>
                <ListGroup.Item className="border-0">
                  <div className="text-center py-2">
                    <Link
                      to="/my-profile/passenger"
                      className="text-decoration-none"
                    >
                      <PersonIcon size={86} className="link-dark" />
                    </Link>
                    <p className="h3 mb-0">{currentUser.firstName}</p>
                    <p className="lead">{currentUser.email}</p>

                    <p className="small text-secondary mb-0">
                      Member since{" "}
                      {dateFormat(currentUser.createdAt, "mm/yyyy")}
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

                <hr className="my-2" />

                <Link
                  to="/my-profile/passenger"
                  className="text-decoration-none"
                >
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">My profile</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                {currentUser.Driver && currentUser.Driver.verified ? (
                  <Link
                    to="/my-profile/driver"
                    className="text-decoration-none"
                  >
                    <ListGroup.Item className="border-0">
                      <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                        <p className="mb-0">My driver's profile</p>
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </div>
                    </ListGroup.Item>
                  </Link>
                ) : (
                  <Link to="/coming-soon" className="text-decoration-none">
                    <ListGroup.Item className="border-0">
                      <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                        <p className="link-success fw-bold mb-0">
                          Become a driver
                        </p>
                        <ChevronRightIcon size={24} verticalAlign="middle" />
                      </div>
                    </ListGroup.Item>
                  </Link>
                )}

                <Link to="/ratings" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">Ratings</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link to="/settings" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">Settings</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <hr className="my-2" />

                <Link to="/notifications" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="position-relative mb-0">
                        Notifications
                        <Badge bg="danger" className="ms-2">
                          {notifications}
                        </Badge>
                      </p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-decoration-none">
                  <ListGroup.Item className="text-center border-0 py-4">
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

                <hr className="my-2" />

                <Link to="/login" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">Login</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>

                <Link to="/signup" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">Signup</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </>
            )}
            <hr className="my-2" />
            <Link to="/donate" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">
                    Donate{" "}
                    <FontAwesomeIcon icon={faDonate} className="text-success" />
                  </p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/download" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Download the App</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            <Link to="/help" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Help</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
            <Link to="/contact" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Contact us</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            <Link to="/coming-soon" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Legal</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <hr className="my-2" />

            {currentUser && currentUser.adminId ? (
              <>
                <Link to="/" className="text-decoration-none">
                  <ListGroup.Item className="text-center border-0 py-4">
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

                <Link to="/admin/dashboard" className="text-decoration-none">
                  <ListGroup.Item className="border-0">
                    <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                      <p className="mb-0">Admin</p>
                      <ChevronRightIcon size={24} verticalAlign="middle" />
                    </div>
                  </ListGroup.Item>
                </Link>
              </>
            ) : null}
          </>
        ) : (
          <>
            <Link to="/" className="text-decoration-none">
              <ListGroup.Item className="text-center border-0 py-4">
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

            <Link to="/admin/dashboard" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Admin</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <div onClick={logOut} className="cursor-pointer mt-4">
            <ListGroup.Item className="border-0 link-success">
              <p className="mb-0 py-1">Log Out</p>
            </ListGroup.Item>
          </div>
        ) : null}
      </ListGroup>
    </Container>
  );
};

export default SideMenu;
