import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faChevronRight,
  faInbox,
  faLifeRing,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { getUserRides, getUserBookings, getDriverBookings } from "../../redux";

const MyRides = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingUserRidesList,
    userRidesListData,
    isLoadingUserBookings,
    userBookingsData,
    isLoadingDriverBookings,
    driverBookingsData,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getUserRides(currentUser.id));
    dispatch(getUserBookings(currentUser.id));
    dispatch(getDriverBookings(currentUser.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container
      fluid
      className="p-0"
      data-aos="fade-in"
      data-aos-duration="1000"
    >
      <ListGroup variant="flush">
        <Link to="/my-rides/driver" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon icon={faCar} className="text-success me-3" />{" "}
                Ride offered
                <Badge bg="success" className="ms-2">
                  {!isLoadingUserRidesList &&
                  !(userRidesListData.length === 0) ? (
                    <>{userRidesListData.length}</>
                  ) : (
                    0
                  )}
                </Badge>
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link
          to="/my-rides/bookings"
          className="text-light text-decoration-none"
        >
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon icon={faInbox} className="text-info me-3" />{" "}
                Your booking requests
                <Badge bg="info" className="ms-2">
                  {!isLoadingDriverBookings &&
                  !(driverBookingsData.length === 0) ? (
                    <>{driverBookingsData.length}</>
                  ) : (
                    0
                  )}
                </Badge>
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/bookings" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  className="text-warning me-3"
                />{" "}
                My bookings
                <Badge bg="warning" className="text-dark ms-2">
                  {!isLoadingUserBookings &&
                  !(userBookingsData.length === 0) ? (
                    <>{userBookingsData.length}</>
                  ) : (
                    0
                  )}
                </Badge>
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <Link to="/help" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
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
      </ListGroup>
    </Container>
  );
};

export default MyRides;
