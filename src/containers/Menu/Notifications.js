import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { BellIcon } from "@primer/octicons-react";
import dateFormat from "dateformat";

import LoadingSpinner from "../../components/LoadingSpinner";
import GoBack from "../../components/GoBack";

import { getNotifications } from "../../redux";

const Notifications = () => {
  // const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const {
    isLoadingDriverNewRidesRequests,
    driverNewRidesRequestsData,
    isLoadingPassengerBookingsResponses,
    passengerBookingsResponsesData,
  } = useSelector((state) => state.notification);

  useEffect(() => {
    if (isLoggedIn) getNotifications(currentUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let notifications = 0;
  let numberDriverNewRidesRequests = 0;
  let numberPassengerBookingsResponses = 0;

  if (
    !isLoadingDriverNewRidesRequests &&
    !isLoadingPassengerBookingsResponses
  ) {
    numberDriverNewRidesRequests =
      driverNewRidesRequestsData.count === undefined
        ? 0
        : driverNewRidesRequestsData.count;
    numberPassengerBookingsResponses =
      passengerBookingsResponsesData.count === undefined
        ? 0
        : passengerBookingsResponsesData.count;

    notifications =
      numberDriverNewRidesRequests + numberPassengerBookingsResponses;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <ListGroup variant="flush">
        <ListGroup.Item className="border-0 mt-3">
          <div className="py-3">
            <BellIcon size={24} className="text-warning me-2" />
            Notifications
            <Badge bg="danger" className="align-text-top ms-2">
              {notifications}
            </Badge>
          </div>
        </ListGroup.Item>
      </ListGroup>

      {/* Display past booking for this ride by this user */}
      {isLoadingDriverNewRidesRequests || isLoadingDriverNewRidesRequests ? (
        <Container className="my-5">
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        </Container>
      ) : null}

      {!isLoadingDriverNewRidesRequests &&
      driverNewRidesRequestsData.count > 0 ? (
        <ListGroup variant="flush">
          <ListGroup.Item className="border border-start-0 border-end-0">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                Bookings for your ride(s)
                <Badge bg="info" className="text-dark align-text-top ms-2">
                  {numberDriverNewRidesRequests}
                </Badge>
              </span>
            </div>
          </ListGroup.Item>

          {driverNewRidesRequestsData.rows.map((request, index) => (
            <Link
              to={`/booking/${request.id}`}
              className="text-light text-decoration-none"
              key={index}
            >
              <ListGroup.Item className="border border-start-0 border-end-0 py-3">
                <small className="text-secondary me-1">
                  {dateFormat(request.createdAt, "dd/mm hh:MM TT")}
                </small>{" "}
                Ride:{" "}
                <span className="text-success">{request.Ride.origin.city}</span>{" "}
                to{" "}
                <span className="text-success">
                  {request.Ride.destination.city}
                </span>{" "}
                ({dateFormat(request.Ride.dateTime, "dd/mm/yyyy")}) - Seats
                booked:{" "}
                <span className="text-success">{request.seatsBooked}</span> /{" "}
                {request.Ride.seatsAvailable}{" "}
                <span>
                  by{" "}
                  <span className="text-success">{request.User.firstName}</span>
                </span>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}

      {/* Display past booking for this ride by this user */}
      {!isLoadingPassengerBookingsResponses &&
      passengerBookingsResponsesData.count > 0 ? (
        <ListGroup variant="flush">
          <ListGroup.Item className="border border-bottom-0 border-start-0 border-end-0">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                Answers from your bookings
                <Badge bg="success" className="text-dark align-text-top ms-2">
                  {numberPassengerBookingsResponses}
                </Badge>
              </span>
            </div>
          </ListGroup.Item>

          {passengerBookingsResponsesData.rows.map((booking, index) => (
            <Link
              to={`/booking/${booking.id}`}
              className="text-light text-decoration-none"
              key={index}
            >
              <ListGroup.Item className="border border-start-0 border-end-0 py-3">
                <small className="text-secondary me-1">
                  {dateFormat(booking.createdAt, "dd/mm hh:MM TT")}
                </small>{" "}
                Ride:{" "}
                <span className="text-success">{booking.Ride.origin.city}</span>{" "}
                to{" "}
                <span className="text-success">
                  {booking.Ride.destination.city}
                </span>{" "}
                ({dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")}){" "}
                <span>
                  by{" "}
                  <span className="text-success">
                    {booking.Ride.Driver.User.firstName}
                  </span>
                </span>{" "}
                |{" "}
                <span
                  className={`text-${bookingStatusVariant(
                    booking.BookingStatus.id
                  )}`}
                >
                  {booking.BookingStatus.name}
                </span>{" "}
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
};

export default Notifications;
