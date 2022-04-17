import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

import { getDriverBookingRide } from "../redux";
import FeedbackMessage from "./FeedbackMessage";
import dateFormat from "dateformat";
import { LinkContainer } from "react-router-bootstrap";

function ManageDriverBooking({ rideId }) {
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant } = useSelector((state) => state.global);
  const { isloadingDriverRideBookingList, driverRideBookingData } = useSelector(
    (state) => state.ride
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverBookingRide(currentUser.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isloadingDriverRideBookingList ? (
        <Row>
          <Col className="text-center">
            <LoadingSpinner />
          </Col>
        </Row>
      ) : driverRideBookingData.length > 0 ? (
        <Row>
          <Col>
            <Container>
              {driverRideBookingData.map((booking, index) => (
                <Row key={index} className="align-items-center my-2">
                  <Col xs="auto">
                    #{index + 1} | {dateFormat(booking.createdAt, "dd/mm/yyyy")}{" "}
                    |{" "}
                    <span className="text-success">{booking.seatsBooked}</span>{" "}
                    seat(s) booked by{" "}
                    <span className="text-success">
                      {booking.User.username}
                    </span>{" "}
                    |
                    {/* Passenger comment:{" "}
                  <i className="text-success">"{booking.commentPassenger}"</i>. */}{" "}
                    Status:{" "}
                    <span
                      className={`text-${bookingStatusVariant(
                        booking.BookingStatusId
                      )}`}
                    >
                      {booking.BookingStatus.name}
                    </span>
                  </Col>
                  <Col
                    xs={12}
                    sm="auto"
                    className="text-center mx-auto mx-lg-0"
                  >
                    <LinkContainer to={`/booking/${booking.id}`}>
                      <Button variant="success" className="rounded-0">
                        Manage
                      </Button>
                    </LinkContainer>
                  </Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col className="text-center">
            <p className="lead">
              You do not have any bookings for this ride yet
            </p>
          </Col>
        </Row>
      )}

      <FeedbackMessage />
    </>
  );
}

export default ManageDriverBooking;
