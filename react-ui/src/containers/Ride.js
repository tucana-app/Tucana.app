import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
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
import { Formik } from "formik";

import { getRide, submitFormBookRide, getUserBookingRide } from "../redux";

import RideDetails from "../components/RideDetails";
import { LinkContainer } from "react-router-bootstrap";
import dateFormat from "dateformat";

const Ride = () => {
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { feedback } = useSelector((state) => state.global);
  const {
    isloadingRide,
    isloadingBookingRide,
    rideData,
    isloadingUserRideBookingList,
    userRideBookingData,
  } = useSelector((state) => state.ride);

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormBookRide(currentUser.id, rideId, values));

    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(getUserBookingRide(currentUser.id, rideId));
    dispatch(getRide(rideId));
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

            <hr className="w-75 mx-auto my-2" />

            <RideDetails rideData={rideData} />

            {/* Display past booking for this rideData.ride.ride by this user */}
            {!(rideData.ride.DriverId === currentUser.id) ? (
              <>
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
                  // <UserBookingsList userRideBookingData={userRideBookingData} />

                  <Container className="my-3">
                    {console.log(userRideBookingData)}
                    <hr className="w-75 mb-4 mx-auto" />

                    <div className="d-inline-flex mb-3">
                      <h3 className="me-2 mb-0">
                        Your previous booking for this ride
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

                {feedback.message && (
                  <Alert variant={feedback.variant} className="my-3">
                    {feedback.message}
                  </Alert>
                )}

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
                    <Form noValidate onSubmit={handleSubmit} className="">
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
                                rideData.ride.DriverId === currentUser.id
                              }
                            >
                              <option value="0" defaultValue="0">
                                Select an option
                              </option>
                              {rideData.optionsSeatsNeeded}
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
                                isloadingBookingRide ||
                                rideData.ride.DriverId === currentUser.id
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
                    </Form>
                  )}
                </Formik>
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
      </Container>
    </div>
  );
};

export default Ride;
