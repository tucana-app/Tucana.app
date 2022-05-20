import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageEmpty from "../../components/MessageEmpty";

import { getDriverBookings } from "../../redux";

const RidesBookings = () => {
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
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mt-4 mb-5">
        {isLoadingDriverBookingsList ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col>
                <div className="text-center mb-4">
                  <h1 className="title text-success mb-0">
                    Bookings for your rides
                  </h1>
                  <p className="lead">Find your potential passenger here</p>
                </div>
              </Col>
            </Row>

            {driverBookingsData.length > 0 ? (
              <>
                {driverBookingsData.map((booking, index) =>
                  !isDateInPast(booking.Ride.dateTime, new Date()) &&
                  booking.BookingStatusId < 3 &&
                  booking.Ride.seatsLeft > 0 ? (
                    <Row key={index} className="mb-2 mx-1 mx-sm-0">
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="border shadow-sm rounded mx-auto"
                      >
                        <Container className="py-3 px-2">
                          <Row className="align-items-center">
                            <Col>
                              <p>
                                {dateFormat(booking.createdAt, "dd/mm/yyyy")}:{" "}
                                <span className="text-success">
                                  {booking.User.firstName}
                                </span>{" "}
                                booked{" "}
                                <span className="text-success">
                                  {booking.seatsBooked}
                                </span>{" "}
                                seat(s) from{" "}
                                <span className="text-success">
                                  {booking.Ride.origin.city}
                                </span>{" "}
                                to{" "}
                                <span className="text-success">
                                  {booking.Ride.destination.city}
                                </span>
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>
                                <span className="text-secondary">Status:</span>{" "}
                                <span
                                  className={`text-${bookingStatusVariant(
                                    booking.BookingStatusId
                                  )}`}
                                >
                                  {booking.BookingStatus.name}
                                </span>
                              </p>
                            </Col>
                          </Row>

                          <Row>
                            <Col xs={12} className="text-center mb-2">
                              <LinkContainer
                                to={`/ride/${booking.RideId}`}
                                className="me-3"
                              >
                                <Button variant="light">See ride</Button>
                              </LinkContainer>
                              <LinkContainer to={`/booking/${booking.id}`}>
                                <Button variant="success">See booking</Button>
                              </LinkContainer>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  ) : null
                )}
              </>
            ) : (
              <Row>
                <Col className="text-center">
                  <MessageEmpty title="bookings" />
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default RidesBookings;
