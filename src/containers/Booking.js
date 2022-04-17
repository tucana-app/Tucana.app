import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import BookingDetails from "../components/BookingDetails";
import FeedbackMessage from "../components/FeedbackMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import FormDriverResponseBooking from "../components/FormDriverResponseBooking";

import { getBooking } from "../redux";

import MessageEmpty from "../components/MessageEmpty";
import GoBack from "../components/GoBack";
import SendMessageButton from "../components/SendMessageButton";

const Booking = () => {
  const { bookingId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isEmptyObject, isDateInPast } = useSelector((state) => state.global);
  const { isloadingBooking, bookingData } = useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBooking(bookingId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mt-4">
        {isloadingBooking ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
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

                  {/* If and is not a past booking */}
                  {/* and the booking is still pending approval */}
                  {!isDateInPast(bookingData.Ride.dateTime, new Date()) &&
                  bookingData.BookingStatusId === 1 ? (
                    // If the booking is pending approval
                    <FormDriverResponseBooking bookingId={bookingId} />
                  ) : null}
                </>
              ) : // The passenger is viewing its booking
              // and the booking is accepted
              null}

              {/* // Display a "Start a conversation with {receiver}" */}
              {!isDateInPast(bookingData.Ride.dateTime, new Date()) &&
              bookingData.BookingStatusId === 3 ? (
                // If the booking is pending approval
                <Row>
                  <Col className="text-center">
                    <SendMessageButton booking={bookingData} />
                  </Col>
                </Row>
              ) : null}
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
                <MessageEmpty title="booking" />
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default Booking;
