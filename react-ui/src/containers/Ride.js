import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";

import RideDetails from "../components/RideDetails";
import ManageDriverBooking from "../components/ManageDriverBooking";
import FeedbackMessage from "../components/FeedbackMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import FormBookRide from "../components/FormBookRide";

import { getRide, getUserBookingRide } from "../redux";
import { LinkContainer } from "react-router-bootstrap";
import PassengersDetails from "../components/PassengersDetails";
import GoBack from "../components/GoBack";
import MessageEmpty from "../components/MessageEmpty";

const Ride = () => {
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { bookingStatusVariant, isDateInPast } = useSelector(
    (state) => state.global
  );
  const {
    isloadingRide,
    rideData,
    isloadingUserRideBookingList,
    userRideBookingData,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getRide(rideId));
      dispatch(getUserBookingRide(currentUser.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in" data-aos-duration="1000">
      <GoBack />

      <Container className="mt-4">
        {isloadingRide ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : rideData.ride ? (
          <>
            <Row>
              <Col xs={12}>
                <h1 className="display-4 font-title">
                  Ride #{rideData.ride.id}:{" "}
                  <span className="text-success">
                    {rideData.ride.cityOrigin}
                  </span>{" "}
                  to{" "}
                  <span className="text-success">
                    {rideData.ride.cityDestination}
                  </span>
                </h1>
              </Col>
            </Row>

            <Row>
              <Col>
                <hr className="w-75 mx-auto my-2" />
              </Col>
            </Row>

            <Row>
              <Col>
                <RideDetails
                  rideData={rideData.ride}
                  driverUsername={rideData.ride.Driver.User.username}
                />
              </Col>
            </Row>

            {/* Display past booking for this ride by this user */}
            {!(rideData.ride.DriverId === currentUser.id) ? (
              <>
                {isloadingUserRideBookingList ? (
                  <>
                    <hr className="w-75 mx-auto my-2" />
                    <Row>
                      <Col className="text-center">
                        <LoadingSpinner />
                      </Col>
                    </Row>
                  </>
                ) : userRideBookingData.length > 0 ? (
                  // <UserBookingsList userRideBookingData={userRideBookingData} />

                  <Container className="my-3">
                    <hr className="w-75 mb-4 mx-auto" />
                    <Row>
                      <Col>
                        <h3 className="me-2 mb-0">
                          Your previous booking(s) for this ride
                        </h3>
                        <p>
                          <Link to="/bookings" className="text-success">
                            Manage your bookings
                          </Link>
                        </p>
                      </Col>
                    </Row>
                    {userRideBookingData.map((booking, index) => (
                      <Row key={index} className="my-2">
                        <Col>
                          #{index + 1} - Date booked:{" "}
                          <span className="text-success">
                            {dateFormat(booking.createdAt, "dd/mm/yyyy")}
                          </span>
                          . Seat(s) booked:{" "}
                          <span className="text-success">
                            {booking.seatsBooked}
                          </span>
                          .
                          {/* Your comment:{" "}
                  <i className="text-success">"{booking.commentPassenger}"</i>. */}{" "}
                          Status:{" "}
                          <span
                            className={`text-${bookingStatusVariant(
                              booking.BookingStatusId
                            )}`}
                          >
                            {booking.BookingStatus.name}
                          </span>
                          <LinkContainer to={`/booking/${booking.id}`}>
                            <Button
                              variant="success"
                              className="rounded-0 text-uppercase ms-2"
                            >
                              View
                            </Button>
                          </LinkContainer>
                        </Col>
                      </Row>
                    ))}
                  </Container>
                ) : null}

                <Row>
                  <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                    <FeedbackMessage />
                  </Col>
                </Row>

                {/* If it is not a past ride, users can book */}
                {!isDateInPast(rideData.ride.dateTime, new Date()) ? (
                  <FormBookRide rideId={rideId} />
                ) : null}
              </>
            ) : (
              <>
                <ManageDriverBooking rideId={rideId} />

                <hr className="w-75 mx-auto" />

                {rideData.ride.seatsLeft === 0 ? (
                  <Row>
                    <Col className="text-center ">
                      <h1 className="text-info fw-light">Congratulations 🎉</h1>
                      <p className="lead">
                        There are no more seats available for this ride!
                      </p>
                    </Col>
                  </Row>
                ) : null}

                <PassengersDetails rideId={rideId} />
              </>
            )}
          </>
        ) : (
          <Row>
            <Col className="text-center">
              <MessageEmpty title="ride" />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Ride;
