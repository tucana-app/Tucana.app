import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import dateFormat from "dateformat";

const BookingDetails = () => {
  const { bookingData } = useSelector((state) => state.ride);

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h1 className="text-info fw-light">Booking details</h1>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs={6} lg={4} className="mb-3">
          <p className="mb-0">
            Passenger:{" "}
            <span className="text-success">{bookingData.User.username}</span>
          </p>
          <p className="mb-0">
            Seats booked:{" "}
            {bookingData.seatsBooked > bookingData.Ride.seatsAvailable ? (
              <>
                <span className="text-danger">{bookingData.seatsBooked}</span> /{" "}
                {bookingData.Ride.seatsAvailable}
              </>
            ) : (
              <>
                <span className="text-success">{bookingData.seatsBooked}</span>{" "}
                / {bookingData.Ride.seatsAvailable}
              </>
            )}
          </p>
        </Col>
        <Col xs={6} lg={4} className="mb-3">
          <p className="mb-0">
            Date: {dateFormat(bookingData.dateTime, "dd/mm/yyyy")}
          </p>
          <p className="mb-0">
            Time: {dateFormat(bookingData.dateTime, "HH:MM TT")}
          </p>
        </Col>

        <Col xs={6} lg={4} className="mb-0 mb-lg-3">
          <p className="mb-0">
            Status:{" "}
            <span className="text-success">
              {bookingData.BookingStatus.name}
            </span>
          </p>
          <p className="mb-0">
            Your comment: "<i>{bookingData.commentDriver}</i>"
          </p>
        </Col>

        <Col xs={6} lg={4} className="mb-0 mb-lg-3"></Col>

        <Col xs={12}>
          <p className="mb-0">
            Passenger comment: "<i>{bookingData.commentPassenger}</i>"
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingDetails;
