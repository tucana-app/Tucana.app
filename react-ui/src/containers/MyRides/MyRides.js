import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Badge, Container, ListGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faChevronRight,
  faInbox,
  faLifeRing,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import {
  getDriverRides,
  getUserBookings,
  getDriverBookings,
} from "../../redux";

const MyRides = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isDateInPast, countDriverBookings, countDriverRides } = useSelector(
    (state) => state.global
  );
  const {
    isLoadingDriverRides,
    driverRidesData,
    isLoadingDriverBookings,
    driverBookingsData,
    isLoadingUserBookings,
    userBookingsData,
  } = useSelector((state) => state.ride);

  const countUserBookings = (userBookingsData) => {
    let count = 0;

    userBookingsData.map((booking, index) => {
      return booking.BookingStatusId === 1 &&
        !isDateInPast(booking.Ride.dateTime, new Date())
        ? count++
        : null;
    });

    return count;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverRides(currentUser.id));
      dispatch(getUserBookings(currentUser.id));
      dispatch(getDriverBookings(currentUser.id));
    }
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
                {isLoadingDriverRides ? (
                  <Spinner
                    animation="grow"
                    role="status"
                    as="span"
                    aria-hidden="true"
                    className="ms-2"
                    size="sm"
                    variant="success"
                  />
                ) : driverRidesData.length > 0 ? (
                  countDriverRides(driverRidesData) ? (
                    <Badge bg="success" className="text-dark ms-2">
                      {countDriverRides(driverRidesData)}
                    </Badge>
                  ) : null
                ) : null}
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
                {isLoadingDriverBookings ? (
                  <Spinner
                    animation="grow"
                    role="status"
                    as="span"
                    aria-hidden="true"
                    className="ms-2"
                    size="sm"
                    variant="info"
                  />
                ) : driverBookingsData.length > 0 ? (
                  countDriverBookings(driverBookingsData) ? (
                    <Badge bg="info" className="text-dark ms-2">
                      {countDriverBookings(driverBookingsData)}
                    </Badge>
                  ) : null
                ) : null}
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
                {isLoadingUserBookings ? (
                  <Spinner
                    animation="grow"
                    role="status"
                    as="span"
                    aria-hidden="true"
                    className="ms-2"
                    size="sm"
                    variant="warning"
                  />
                ) : userBookingsData.length > 0 ? (
                  countUserBookings(userBookingsData) ? (
                    <Badge bg="warning" className="text-dark ms-2">
                      {countUserBookings(userBookingsData)}
                    </Badge>
                  ) : null
                ) : null}
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
