import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCarAlt } from "@fortawesome/free-solid-svg-icons";
import dateFormat from "dateformat";
import { Formik } from "formik";

import { getRide, submitFormBookRide, getUserBookingRide } from "../redux";

const Ride = () => {
  // Params from URL
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { feedback } = useSelector((state) => state.global);
  const {
    isloadingRide,
    rideData,
    isloadingBookingRide,
    isloadingUserRideBookingList,
    userRideBookingData,
  } = useSelector((state) => state.ride);

  // Form validation
  const form = useRef();

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormBookRide(currentUser.id, rideId, values));

    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(getRide(rideId));
    dispatch(getUserBookingRide(currentUser.id, rideId));
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
      {isloadingRide ? (
        <Row>
          <Col className="text-center">
            <Spinner
              animation="border"
              role="status"
              as="span"
              aria-hidden="true"
              className="align-middle me-2"
              variant="success"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
            Fetching your rides...
          </Col>
        </Row>
      ) : rideData.ride ? (
        <>
          <Container className="mt-4 mb-3">
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
          </Container>

          <hr className="w-75 mx-auto my-2" />

          <Container className="my-3">
            <Row className="align-items-center">
              <Col xs={6} sm={3} lg={2} className="mb-3">
                <p className="mb-0">Origin:</p>
                <p className="mb-0">Province: </p>
              </Col>
              <Col xs={6} sm={3} lg={2} className="mb-3">
                <p className="text-warning mb-0">{rideData.ride.cityOrigin}</p>
                <p className="text-warning mb-0">
                  {rideData.ride.provinceOrigin}
                </p>
              </Col>

              <Col xs={6} sm={3} lg={2} className="mb-3">
                <p className="mb-0">Destination:</p>
                <p className="mb-0">Province:</p>
              </Col>
              <Col xs={6} sm={3} lg={2} className="mb-3">
                <p className="text-success mb-0">
                  {rideData.ride.cityDestination}
                </p>
                <p className="text-success mb-0">
                  {rideData.ride.provinceDestination}
                </p>
              </Col>
              <Col lg={4}></Col>

              <Col xs={6} lg={4} className="mb-lg-3">
                <p className="mb-0">
                  Date: {dateFormat(rideData.ride.dateTime, "dd/mm/yyyy")}
                </p>
                <p className="mb-0">
                  Time: {dateFormat(rideData.ride.dateTime, "HH:MM TT")}
                </p>
              </Col>
              <Col xs={6} lg={4}>
                <p className="mb-0">
                  Driver:{" "}
                  <span className="text-success">
                    {/* {rideData.ride.User.username} */}
                  </span>
                </p>
                <p className="mb-0">
                  Seats left:{" "}
                  <span className="text-success">
                    {rideData.ride.seatsLeft}
                  </span>{" "}
                  / {rideData.ride.seatsAvailable}
                </p>
              </Col>
              {!(rideData.ride.comment === "") ? (
                <Col xs={12} className="my-3 mt-lg-0">
                  <p className="mb-0">Comment:</p>
                  <i>"{rideData.ride.comment}"</i>
                </Col>
              ) : null}
              <Col xs={6} lg={4}>
                <p className="mb-0"></p>
              </Col>
            </Row>
          </Container>

          {!(rideData.ride.User.id === currentUser.id) ? (
            <>
              {/* Display past booking for this rideData.ride.ride by this user */}
              {isloadingUserRideBookingList ? (
                <Container>
                  <hr className="w-75 mx-auto my-2" />
                  <Row>
                    <Col className="text-center">
                      <Spinner
                        animation="border"
                        role="status"
                        as="span"
                        aria-hidden="true"
                        className="align-middle me-2"
                        variant="success"
                      >
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                      Fetching your booking for this ride...
                    </Col>
                  </Row>
                </Container>
              ) : userRideBookingData.length > 0 ? (
                <Container className="my-3">
                  <hr className="w-75 mb-4 mx-auto" />

                  <div className="d-inline-flex mb-3">
                    <h3 className="me-2 mb-0">
                      Previous booking for this ride
                    </h3>
                    <LinkContainer to="/my-rides/bookings">
                      <Button variant="success" className="rounded-0">
                        Learn more
                      </Button>
                    </LinkContainer>
                  </div>
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
                      </Col>
                    </Row>
                  ))}
                </Container>
              ) : null}

              <hr className="w-75 mx-auto my-2" />

              <Container className="py-3">
                <Formik
                  validationSchema={rideData.ride.schema}
                  onSubmit={handleSubmit}
                  initialValues={{
                    seatsNeeded: 0,
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    // handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form
                      noValidate
                      onSubmit={handleSubmit}
                      ref={form}
                      className=""
                    >
                      <Row>
                        <Col xs={8} sm={6} md={5} lg={4} className="mx-auto">
                          <p className="lead mb-1">Book this ride</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={8}
                          sm={6}
                          md={5}
                          lg={4}
                          className="border py-2 mx-auto"
                        >
                          <Form.Group className="mx-auto mb-3">
                            <Form.Label>
                              <FontAwesomeIcon
                                icon={faCarAlt}
                                className="text-success me-2"
                              />
                              <span className="d-xs-screen">Passengers</span>
                              <span className="d-md-screen">
                                Number of passenger
                              </span>
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                              name="seatsNeeded"
                              className="rounded-0"
                              onChange={handleChange}
                              isInvalid={!!errors.seatsNeeded}
                              isValid={
                                touched.seatsNeeded && !errors.seatsNeeded
                              }
                              disabled={
                                isSubmitting ||
                                rideData.ride.User.id === currentUser.id
                              }
                            >
                              <option value="0" defaultValue="0">
                                Select an option
                              </option>
                              {rideData.ride.optionsSeatsNeeded}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.seatsNeeded}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="text-end mx-auto">
                            <span>Everything looks good? </span>
                            <Button
                              variant="success"
                              size="lg"
                              className="rounded-0 fw-bold"
                              type="submit"
                              disabled={
                                isSubmitting ||
                                // isloadingBookingRide ||
                                rideData.ride.User.id === currentUser.id
                              }
                            >
                              {isSubmitting || isloadingBookingRide ? (
                                <Spinner
                                  animation="border"
                                  role="status"
                                  as="span"
                                  aria-hidden="true"
                                  className="align-middle me-2"
                                >
                                  <span className="sr-only">Loading...</span>
                                </Spinner>
                              ) : null}
                              BOOK
                            </Button>
                          </Form.Group>
                        </Col>
                      </Row>

                      {feedback.message && (
                        <Alert variant={feedback.variant} className="mt-3">
                          {feedback.message}
                        </Alert>
                      )}
                    </Form>
                  )}
                </Formik>
              </Container>
            </>
          ) : (
            <>
              <hr className="w-75 mx-auto my-2" />

              <Container className="py-4">
                <Row>
                  <Col className="text-center">
                    Manage the bookings for your ride
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </>
      ) : null}
      {/* )} */}
    </div>
  );
};

export default Ride;
