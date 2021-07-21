import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";

import RideDetails from "../components/RideDetails";
import ManageDriverBooking from "../components/ManageDriverBooking";
import FeedbackMessage from "../components/FeedbackMessage";
import LoadingMessage from "../components/LoadingMessage";
import FormBookRide from "../components/FormBookRide";

import { getRide, getUserBookingRide } from "../redux";
import { LinkContainer } from "react-router-bootstrap";

const Ride = () => {
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isloadingRide,
    rideData,
    isloadingUserRideBookingList,
    userRideBookingData,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getRide(rideId));
    dispatch(getUserBookingRide(currentUser.id, rideId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div data-aos="fade-in" data-aos-duration="1000">
      <ListGroup variant="flush">
        <Link to="/find-ride" className="text-light text-decoration-none">
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
        {isloadingRide ? (
          <Row>
            <Col className="text-center">
              <LoadingMessage />
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
                  driverUsername={rideData.ride.User.username}
                />
              </Col>
            </Row>

            {/* Display past booking for this rideData.ride.ride by this user */}
            {!(rideData.ride.DriverId === currentUser.id) ? (
              <>
                {isloadingUserRideBookingList ? (
                  <>
                    <hr className="w-75 mx-auto my-2" />
                    <Row>
                      <Col className="text-center">
                        <LoadingMessage />
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
                          <span className="text-success">
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
                  <Col>
                    <hr className="w-75 mx-auto my-4" />
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                    <FeedbackMessage />
                  </Col>
                </Row>

                <FormBookRide rideId={rideId} />
              </>
            ) : (
              <ManageDriverBooking rideId={rideId} />
            )}
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default Ride;
