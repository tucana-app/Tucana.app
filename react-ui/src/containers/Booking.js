import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import BookingDetails from "../components/BookingDetails";
import RideDetails from "../components/RideDetails";
import FeedbackMessage from "../components/FeedbackMessage";
import LoadingMessage from "../components/LoadingMessage";
import FormDriverResponseBooking from "../components/FormDriverResponseBooking";

import { getBooking } from "../redux";

import NoBookingMessage from "../components/NoBookingMessage";
import { LinkContainer } from "react-router-bootstrap";

const Booking = () => {
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isEmptyObject } = useSelector((state) => state.global);
  const { isloadingBooking, bookingData } = useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getBooking(bookingId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in" data-aos-duration="1000">
      <ListGroup variant="flush">
        <Link to="/bookings" className="text-light text-decoration-none">
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

      <Container className="mt-4">
        {isloadingBooking ? (
          <Row>
            <Col className="text-center">
              <LoadingMessage />
            </Col>
          </Row>
        ) : !isEmptyObject(bookingData) ? (
          currentUser.id === bookingData.User.id ||
          currentUser.id === bookingData.DriverId ? (
            <>
              <Row>
                <Col xs={12}>
                  <h1 className="display-4 font-title">
                    Booking #{bookingData.id}:{" "}
                    <span className="text-success">
                      {bookingData.User ? bookingData.User.username : null}
                    </span>{" "}
                    booked{" "}
                    <span className="text-success">
                      {bookingData.seatsBooked}
                    </span>{" "}
                    seat(s)
                  </h1>
                </Col>
              </Row>

              <Row>
                <Col>
                  <hr className="w-75 mx-auto my-2" />
                </Col>
              </Row>

              {bookingData.Ride.id ? (
                <>
                  <Row>
                    <Col>
                      <h1 className="text-info fw-light">Ride details</h1>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <RideDetails
                        rideData={bookingData.Ride}
                        driverUsername={bookingData.Ride.User.username}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} className="text-center mb-3">
                      <LinkContainer to={`/ride/${bookingData.RideId}`}>
                        <Button
                          variant="success"
                          className="rounded-0 text-uppercase"
                        >
                          View ride
                        </Button>
                      </LinkContainer>
                    </Col>
                  </Row>
                </>
              ) : null}

              <Row>
                <Col>
                  <hr className="w-75 mx-auto my-2" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <BookingDetails />
                </Col>
              </Row>

              <Row>
                <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                  <FeedbackMessage />
                </Col>
              </Row>

              {/* If the viewer is the driver */}
              {bookingData.DriverId === currentUser.id ? (
                <>
                  <Row>
                    <Col>
                      <hr className="w-75 mx-auto my-4" />
                    </Col>
                  </Row>

                  {/* If the booking has no seats left */}
                  {bookingData.Ride.seatsLeft === 0 ? (
                    <Row>
                      <Col className="text-center ">
                        <h1 className="text-info fw-light">
                          Congratulations 🎉
                        </h1>
                        <p className="lead">
                          There are no more seats avaialable for this ride!
                        </p>
                      </Col>
                    </Row>
                  ) : bookingData.BookingStatusId === 1 ? (
                    // If the booking is pending approval
                    <FormDriverResponseBooking bookingId={bookingId} />
                  ) : null}
                </>
              ) : // The passenger is viewing his/her booking
              // <PassengerManageBooking />
              null}
            </>
          ) : (
            // Viewer not the driver nor a passenger
            // Not authorized to see the booking's details
            <Redirect to="/bookings" />
          )
        ) : (
          <Container>
            <Row>
              <Col className="text-center">
                <NoBookingMessage />
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default Booking;
