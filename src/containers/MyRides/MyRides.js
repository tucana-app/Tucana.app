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
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import {
  getDriverRides,
  getUserBookings,
  getDriverBookings,
  getRidesToConfirm,
} from "../../redux";

import LoadingSpinner from "../../components/LoadingSpinner";

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
    isLoadingRidesToConfirm,
    ridesToConfirmData,
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
      dispatch(getRidesToConfirm(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container fluid className="p-0">
      <ListGroup variant="flush">
        {isLoadingRidesToConfirm ? (
          <LoadingSpinner />
        ) : ridesToConfirmData.length ? (
          <>
            <Link
              to="/rides/rides-to-confirm"
              className="text-light text-decoration-none"
            >
              <ListGroup.Item className="border border-start-0 border-end-0 ">
                <div className="d-inline-flex justify-content-between w-100 py-2">
                  <span className="fw-bold">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-warning me-3"
                    />{" "}
                    Rides to confirm
                    <Badge
                      bg="warning"
                      className="text-dark align-text-top ms-2"
                    >
                      {ridesToConfirmData.length}
                    </Badge>
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </ListGroup.Item>
            </Link>

            <ListGroup.Item className="border border-top-0 border-start-0 border-end-0">
              <p className="py-2 mb-0"></p>
            </ListGroup.Item>
          </>
        ) : null}

        <ListGroup.Item className="border-0">
          <p className="lead py-2 mb-0">Passenger</p>
        </ListGroup.Item>

        <Link to="/bookings" className="text-light text-decoration-none">
          <ListGroup.Item className="border border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  className="text-primary me-3"
                />{" "}
                My bookings
                {isLoadingUserBookings ? (
                  <LoadingSpinner />
                ) : userBookingsData.length > 0 ? (
                  countUserBookings(userBookingsData) ? (
                    <Badge bg="primary" className="align-text-top ms-2">
                      {countUserBookings(userBookingsData)}
                    </Badge>
                  ) : null
                ) : null}
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <ListGroup.Item className="border border-top-0 border-start-0 border-end-0">
          <p className="py-2 mb-0"></p>
        </ListGroup.Item>

        <ListGroup.Item className="border border-top-0 border-start-0 border-end-0">
          <p className="lead py-2 mb-0">Driver</p>
        </ListGroup.Item>

        <Link to="/my-rides/driver" className="text-light text-decoration-none">
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon icon={faCar} className="text-success me-3" />{" "}
                Ride offered
                {isLoadingDriverRides ? (
                  <LoadingSpinner />
                ) : driverRidesData.length > 0 ? (
                  countDriverRides(driverRidesData) ? (
                    <Badge
                      bg="success"
                      className="text-dark align-text-top ms-2"
                    >
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
          <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon icon={faInbox} className="text-info me-3" />{" "}
                Booking received
                {isLoadingDriverBookings ? (
                  <LoadingSpinner />
                ) : driverBookingsData.length > 0 ? (
                  countDriverBookings(driverBookingsData) ? (
                    <Badge bg="info" className="text-dark align-text-top ms-2">
                      {countDriverBookings(driverBookingsData)}
                    </Badge>
                  ) : null
                ) : null}
              </span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </ListGroup.Item>
        </Link>

        <ListGroup.Item className="border-0">
          <p className="py-2 mb-0"></p>
        </ListGroup.Item>

        <Link to="/help" className="text-light text-decoration-none">
          <ListGroup.Item className="border border-start-0 border-end-0 ">
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
      </ListGroup>
    </Container>
  );
};

export default MyRides;