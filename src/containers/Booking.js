import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";
import {
  CircleIcon,
  StarFillIcon,
  ChevronRightIcon,
  ArrowDownIcon,
} from "@primer/octicons-react";

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
  const {
    isEmptyObject,
    isDateInPast,
    bookingStatusVariant,
    rideStatusVariant,
  } = useSelector((state) => state.global);
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
    <div>
      <GoBack />

      <Container className="mt-4">
        {isloadingBooking ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : !isEmptyObject(bookingData) && bookingData !== null ? (
          currentUser.id === bookingData.User.id ||
          currentUser.id === bookingData.DriverId ? (
            <div data-aos="fade-in">
              <Row>
                <Col className="text-center">
                  <h1 className="mb-0">Booking</h1>
                </Col>
              </Row>

              <hr className="my-4" />

              <h2 className="text-success text-center">Booking details</h2>

              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  className="border shadow-sm rounded mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col>
                        <p>
                          {currentUser.id === bookingData.User.id ? (
                            "You"
                          ) : (
                            <span className="text-success">
                              {bookingData.User.firstName}
                            </span>
                          )}{" "}
                          booked{" "}
                          <span className="text-success">
                            {bookingData.seatsBooked}
                          </span>{" "}
                          seat{bookingData.seatsBooked > 0 ? "s" : null} to{" "}
                          <span className="text-success">
                            {bookingData.Ride.cityDestination}
                          </span>{" "}
                          on the{" "}
                          {dateFormat(bookingData.Ride.dateTime, "dd/mm/yy")}
                        </p>
                        <p className="mb-0">
                          Status:{" "}
                          <span
                            className={`text-${bookingStatusVariant(
                              bookingData.BookingStatusId
                            )}`}
                          >
                            {bookingData.BookingStatus.name}
                          </span>
                        </p>
                        {bookingData.commentPassenger !== "" &&
                        bookingData.commentPassenger !== null ? (
                          <>
                            <p className="mt-3 mb-0">Passenger comment: </p>
                            <p>"{bookingData.commentPassenger}"</p>
                          </>
                        ) : null}
                        {bookingData.commentDriver !== "" &&
                        bookingData.commentDriver !== null ? (
                          <>
                            <p className="mt-3 mb-0">Driver comment: </p>
                            <p className="mb-0">
                              "{bookingData.commentDriver}"
                            </p>
                          </>
                        ) : null}
                        {currentUser.id === bookingData.DriverId ? (
                          <p className="mt-2 mb-0">
                            <SendMessageButton
                              type="link"
                              driverId={bookingData.DriverId}
                              userId={bookingData.UserId}
                              receiverName={bookingData.User.firstName}
                              rideId={bookingData.Ride}
                            />
                          </p>
                        ) : null}
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              {/* If not a past booking */}
              {/* and the booking is still pending approval */}
              {currentUser.id === bookingData.DriverId &&
              !isDateInPast(bookingData.Ride.dateTime, new Date()) &&
              bookingData.BookingStatusId === 1 ? (
                <Row className="mb-2 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    className="border shadow-sm rounded mx-auto"
                  >
                    <Container className="py-3 px-2">
                      <FormDriverResponseBooking bookingId={bookingId} />
                      <FeedbackMessage />
                    </Container>
                  </Col>
                </Row>
              ) : null}

              {currentUser.id !== bookingData.DriverId ? (
                <Row className="mb-4 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    className="border shadow-sm rounded mx-auto"
                  >
                    <Container className="py-3 px-2">
                      <LinkContainer
                        to="/coming-soon"
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="text-end pe-0">
                            <CircleIcon size={56} className="text-secondary" />
                          </Col>
                          <Col xs={6} className="text-start">
                            <p className="mb-0">
                              {bookingData.Ride.Driver.User.firstName}
                            </p>
                            <p className="mb-0">
                              <StarFillIcon
                                size={18}
                                verticalAlign="middle"
                                className="text-warning me-2"
                              />

                              <span>-/5 | - ratings</span>
                            </p>
                          </Col>
                          <Col className="text-end">
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </Col>
                        </Row>
                      </LinkContainer>
                      {currentUser.id === bookingData.User.id ? (
                        <Row className="mt-3">
                          <Col>
                            <SendMessageButton
                              type="link"
                              driverId={bookingData.Ride.DriverId}
                              userId={currentUser.id}
                              receiverName={
                                bookingData.Ride.Driver.User.firstName
                              }
                              rideId={bookingData.Ride}
                            />
                          </Col>
                        </Row>
                      ) : null}
                    </Container>
                  </Col>
                </Row>
              ) : null}

              <h2 className="text-success text-center mt-3">Ride details</h2>

              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  className="border shadow-sm rounded mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row className="mb-2">
                      <Col className="text-center">
                        <p className="mb-0">
                          {dateFormat(bookingData.Ride.dateTime, "dd/mm/yyyy")}
                        </p>
                        <p className="fw-bold text-success mb-0">
                          {dateFormat(bookingData.Ride.dateTime, "hh:mm TT")}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <h2 className="fw-bold mb-0">
                          {bookingData.Ride.cityOrigin}
                        </h2>
                        <p className="small mb-0">
                          {bookingData.Ride.provinceOrigin}
                        </p>

                        <ArrowDownIcon size={24} className="text-success" />

                        <h2 className="fw-bold mb-0">
                          {bookingData.Ride.cityDestination}
                        </h2>
                        <p className="small mb-0">
                          {bookingData.Ride.provinceDestination}
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  className="border shadow-sm rounded mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row className="align-items-center">
                      <Col xs={6} className="text-center">
                        <p className="mb-0">Seats available:</p>
                        <p className="mb-0">
                          <span className="text-success">
                            {bookingData.Ride.seatsLeft}
                          </span>{" "}
                          / {bookingData.Ride.seatsAvailable}
                        </p>
                      </Col>
                      <Col xs={6} className="text-center">
                        <p className="mb-0">
                          Status:{" "}
                          <span
                            className={`text-${rideStatusVariant(
                              bookingData.Ride.RideStatus.id
                            )}`}
                          >
                            {bookingData.Ride.RideStatus.name}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>

              <Row className="mb-2 mx-1 mx-sm-0">
                <Col
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                  className="border shadow-sm rounded mx-auto"
                >
                  <Container className="py-3 px-2">
                    <Row>
                      <Col className="text-center">
                        <LinkContainer
                          to={`/ride/${bookingData.RideId}`}
                          className="cursor-pointer"
                        >
                          <Button variant="success">More</Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </div>
          ) : (
            // Viewer not the driver nor a passenger
            // Not authorized to see the booking's details
            <Redirect to="/bookings" />
          )
        ) : (
          <Row>
            <Col className="text-center">
              <MessageEmpty title="booking" />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Booking;
