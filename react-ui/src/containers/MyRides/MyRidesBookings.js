import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import LoadingMessage from "../../components/LoadingMessage";
import FeedbackMessage from "../../components/FeedbackMessage";
import NoBookingMessage from "../../components/NoBookingMessage";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

import { getDriverBookings } from "../../redux";

const MyRidesBookings = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingDriverBookingsList, driverBookingsData } = useSelector(
    (state) => state.ride
  );
  const { bookingStatusVariant, isDateInPast } = useSelector(
    (state) => state.global
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getDriverBookings(currentUser.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="slide-right">
      <ListGroup variant="flush">
        <Link to="/my-rides" className="text-light text-decoration-none">
          <ListGroup.Item className="bg-dark text-white border border-top-0 border-start-0 border-end-0 ">
            <div className="d-inline-flex justify-content-between w-100 py-3">
              <span>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-success me-3"
                />{" "}
                Go back
              </span>
            </div>
          </ListGroup.Item>
        </Link>
      </ListGroup>

      <Container className="mt-4 mb-5">
        {isLoadingDriverBookingsList ? (
          <Row>
            <Col className="text-center">
              <LoadingMessage />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col>
                <div className="text-center mb-4">
                  <h1 className="font-title text-success mb-0">
                    Bookings for your rides
                  </h1>
                  <p className="lead">Find your potential passenger here</p>
                </div>
              </Col>
            </Row>

            {driverBookingsData.length > 0 ? (
              <>
                {driverBookingsData.map((booking, index) => (
                  <Row
                    className="justify-content-center justify-content-md-start justify-content-lg-center align-items-center border border-start-0 border-end-0 py-3 mx-1 mx-sm-2"
                    data-aos="fade-zoom-in"
                    data-aos-delay={index * 150}
                    data-aos-once="true"
                    key={index}
                  >
                    <Col xs={12}>
                      <p className="">
                        #<span className="text-success">{index + 1}</span> |{" "}
                        {dateFormat(booking.createdAt, "dd/mm/yyyy")} |{" "}
                        <span className="text-secondary">Ride:</span>{" "}
                        <span className="text-success">
                          {booking.Ride.cityOrigin}
                        </span>{" "}
                        to{" "}
                        <span className="text-success">
                          {booking.Ride.cityDestination}
                        </span>{" "}
                        ({dateFormat(booking.Ride.dateTime, "dd/mm/yyyy")}) |{" "}
                        <span className="text-secondary">Passenger:</span>{" "}
                        <span className="text-success">
                          {booking.User.username}
                        </span>{" "}
                        | <span className="text-secondary">Seats booked:</span>{" "}
                        <span className="text-success">
                          {booking.seatsBooked}
                        </span>{" "}
                        ({booking.Ride.seatsLeft} /{" "}
                        {booking.Ride.seatsAvailable} seats left) |{" "}
                        <span className="text-secondary">Status:</span>{" "}
                        <span
                          className={`text-${bookingStatusVariant(
                            booking.BookingStatusId
                          )}`}
                        >
                          {booking.BookingStatus.name}
                        </span>
                      </p>
                      {isDateInPast(booking.Ride.dateTime, new Date()) ? (
                        <p className="text-center text-warning">
                          This is a past ride
                        </p>
                      ) : null}
                    </Col>

                    <Col className="text-center mt-3">
                      <LinkContainer
                        to={`/ride/${booking.RideId}`}
                        className="me-3"
                      >
                        <Button
                          variant="info"
                          className="rounded-0 text-uppercase"
                        >
                          View ride
                        </Button>
                      </LinkContainer>
                      <LinkContainer to={`/booking/${booking.id}`}>
                        <Button
                          variant="success"
                          className="rounded-0 text-uppercase"
                        >
                          View booking
                        </Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                ))}
              </>
            ) : (
              <>
                <Row>
                  <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                    <FeedbackMessage />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <NoBookingMessage />
                  </Col>
                </Row>

                {/* <Row>
                <Col xs={12} md={6} className="mx-auto">
                  <Accordion>
                    {driverBookingsData.map((ride, index) => (
                      <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>
                          <span className="fw-bolder">
                            {ride.cityOrigin} - {ride.cityDestination} (
                            {dateFormat(ride.dateTime, "dd-mm-yyyy")})
                          </span>
                        </Accordion.Header>
                        <Accordion.Body className="p-0">
                          <ListGroup className="border border-success border-3 rounded">
                            <ListGroup.Item>
                              <span className="text-success">Origin:</span>{" "}
                              {ride.cityOrigin} ({ride.provinceOrigin})
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text-danger">Destination:</span>{" "}
                              {ride.cityDestination} ({ride.provinceDestination}
                              )
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Date/time:{" "}
                              {dateFormat(
                                ride.dateTime,
                                "dd-mm-yyyy @ HH:MM TT"
                              )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Seats left: {ride.seatsLeft}/{ride.seatsAvailable}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Comment: {ride.comment}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <span className="text-warning fw-bold">
                                Status:
                              </span>{" "}
                              {ride.RideStatus.name}
                            </ListGroup.Item>
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Col>
              </Row>
            ) : (
              <Row>
              <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                <FeedbackMessage />
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <NoRidesMessage />
              </Col>
            </Row>
            )}
          </>
        )} */}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MyRidesBookings;
