import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faInbox,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";
import LoadingSpinner from "../components/LoadingSpinner";
import GoBack from "../components/GoBack";

import { getNotifications } from "../redux";

const NotificationPage = () => {
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
    numberDriverNewRidesRequests = driverNewRidesRequestsData.count;
    numberPassengerBookingsResponses = passengerBookingsResponsesData.count;

    notifications =
      numberDriverNewRidesRequests + numberPassengerBookingsResponses;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-left">
      <GoBack />

      <ListGroup variant="flush">
        <ListGroup.Item className="border border-top-0 border-start-0 border-end-0 ">
          <div className="d-inline-flex justify-content-between w-100 py-3">
            <span>
              {notifications > 0 ? (
                <>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-warning me-3"
                  />{" "}
                  <span>
                    New notifications
                    <Badge bg="danger" className="ms-2">
                      {notifications}
                    </Badge>
                  </span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-warning me-3"
                  />{" "}
                  <span>
                    No new notifications
                    <Badge bg="danger" className="ms-2">
                      0
                    </Badge>
                  </span>
                </>
              )}
            </span>
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
                <FontAwesomeIcon icon={faInbox} className="text-info me-3" />{" "}
                Bookings for your ride(s)
                <Badge bg="info" className="text-dark ms-2">
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
                  {dateFormat(request.createdAt, "dd/mm HH:MM")}
                </small>{" "}
                Ride:{" "}
                <span className="text-success">{request.Ride.cityOrigin}</span>{" "}
                to{" "}
                <span className="text-success">
                  {request.Ride.cityDestination}
                </span>{" "}
                ({dateFormat(request.Ride.dateTime, "dd/mm/yyyy")}) - Seats
                booked:{" "}
                <span className="text-success">{request.seatsBooked}</span> /{" "}
                {request.Ride.seatsAvailable}{" "}
                <span>
                  by{" "}
                  <span className="text-success">{request.User.username}</span>
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
          <ListGroup.Item className="border border-start-0 border-end-0">
            <div className="d-inline-flex justify-content-between w-100 py-2">
              <span>
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  className="text-success me-3"
                />
                Answers from your bookings
                <Badge bg="success" className="text-dark ms-2">
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
                  {dateFormat(booking.createdAt, "dd/mm HH:MM")}
                </small>{" "}
                Ride:{" "}
                <span className="text-success">{booking.Ride.cityOrigin}</span>{" "}
                to{" "}
                <span className="text-success">
                  {booking.Ride.cityDestination}
                </span>{" "}
                ({dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")}){" "}
                <span>
                  by{" "}
                  <span className="text-success">
                    {booking.Ride.Driver.User.username}
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

export default NotificationPage;
