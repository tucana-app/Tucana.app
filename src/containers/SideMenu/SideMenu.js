import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Container, ListGroup } from "react-bootstrap";
import {
  ChevronRightIcon,
  LinkExternalIcon,
  PersonIcon,
} from "@primer/octicons-react";
import dateFormat from "dateformat";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

import { logout } from "../../redux";

// Importing assets
import logo from "../../assets/images/OPTI_noir.png";

const SideMenu = () => {
  const { t, i18n } = useTranslation();

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
    <Container fluid className="p-0" data-aos="fade-in">
      <ListGroup variant="flush">
        {isLoggedIn ? (
          <>
            <ListGroup.Item className="border-0">
              <div className="text-center py-2">
                <Link to="/profile/passenger" className="text-decoration-none">
                  <PersonIcon size={86} className="link-dark" />
                </Link>
                <p className="h3 mb-0">{currentUser.firstName}</p>
                <p className="lead">{currentUser.email}</p>

                <p className="small text-secondary mb-0">
                  Member since {dateFormat(currentUser.createdAt, "mm/yyyy")}
                </p>
              </div>
            </ListGroup.Item>

            <hr className="my-2" />

            <Link to="/profile/passenger" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Profile</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            {currentUser.Driver ? (
              <Link to="/profile/driver" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="mb-0">Driver's profile</p>
                    <ChevronRightIcon size={24} verticalAlign="middle" />
                  </div>
                </ListGroup.Item>
              </Link>
            ) : (
              <Link to="/become-driver" className="text-decoration-none">
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="text-success mb-0">Become a driver</p>
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

            {currentUser.Driver ? (
              <>
                <ListGroup.Item className="border-0">
                  <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                    <p className="text-secondary mb-0">Vehicles</p>
                  </div>
                </ListGroup.Item>

                <hr className="my-2" />
              </>
            ) : null}

            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="text-secondary mb-0">Payments</p>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="border-0">
              <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                <p className="text-secondary mb-0">Refunds</p>
              </div>
            </ListGroup.Item>

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
                  <p className="mb-0">Log In</p>
                  <ChevronRightIcon size={24} verticalAlign="middle" />
                </div>
              </ListGroup.Item>
            </Link>

            <Link to="/signup" className="text-decoration-none">
              <ListGroup.Item className="border-0">
                <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
                  <p className="mb-0">Sign Up</p>
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
              <p className="text-success fw-bold mb-0">Donate </p>
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

        <Link to="/coming-soon" className="text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <p className="mb-0">Feedbacks</p>
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <ListGroup.Item className="border-0">
          <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
            <p className="text-secondary mb-0">Rate the app</p>
          </div>
        </ListGroup.Item>

        <hr className="my-2" />

        <Link to="/help" className="text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <p className="mb-0">Help</p>
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/language" className="text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <div className="mb-0">
                {i18n.language === "en" ? (
                  <>
                    <ReactCountryFlag
                      countryCode="US"
                      className="me-2 mb-1"
                      svg
                    />
                    {t("global.language")}
                  </>
                ) : null}
                {i18n.language === "es" ? (
                  <>
                    <ReactCountryFlag
                      countryCode="CR"
                      className="me-2 mb-1"
                      svg
                    />
                    {t("global.language")}
                  </>
                ) : null}
                {i18n.language === "fr" ? (
                  <>
                    <ReactCountryFlag
                      countryCode="FR"
                      className="me-2 mb-1"
                      svg
                    />
                    {t("global.language")}
                  </>
                ) : null}
              </div>
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/map" className="text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <p className="mb-0">Map of Costa Rica</p>
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
        <a
          href="https://ridecr.atwebpages.com"
          target={"_blank"}
          rel="noreferrer"
          className="text-decoration-none"
        >
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <p className="mb-0">About us</p>
              <LinkExternalIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </a>

        <hr className="my-2" />

        <Link to="/legal" className="text-decoration-none">
          <ListGroup.Item className="border-0">
            <div className="d-inline-flex justify-content-between align-items-center w-100 py-1">
              <p className="mb-0">Legal</p>
              <ChevronRightIcon size={24} verticalAlign="middle" />
            </div>
          </ListGroup.Item>
        </Link>

        <hr className="my-2" />

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
