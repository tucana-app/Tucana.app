import React, { useState, useEffect, useRef } from "react";
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
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCarAlt } from "@fortawesome/free-solid-svg-icons";
import { isNumeric } from "validator";
import dateFormat from "dateformat";
import { Formik } from "formik";
import * as Yup from "yup";

import { getAllRides, submitFormBookRide, getUserBookingRide } from "../redux";
import { LinkContainer } from "react-router-bootstrap";

function Ride() {
  // Params from URL
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );
  const {
    isloadingAllRidesList,
    allRidesListData,
    isloadingBookingRide,
    isloadingUserRideBookingList,
    userRideBookingData,
  } = useSelector((state) => state.ride);

  var ride = allRidesListData.find((ride) => ride.id === parseInt(rideId));

  useEffect(() => {
    dispatch(getUserBookingRide(currentUser.id, rideId));
  }, []);

  // Render the list of option for the number of seats available
  var optionsSeatsNeeded = [];
  var schema = {};

  if (ride) {
    for (let i = 1; i <= ride.seatsLeft; i++) {
      optionsSeatsNeeded.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    schema = Yup.object().shape({
      seatsNeeded: Yup.number("dsdas")
        .min(1, "Min. 1 passenger required")
        .max(ride.seatsLeft, `Max. ${ride.seatsLeft} passengers`)
        .required(labelRequiredField),
      comment: Yup.string(labelStringField),
    });
  } else {
    dispatch(getAllRides());
  }

  // Form validation
  const form = useRef();

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormBookRide(currentUser.id, rideId, values));

    formikBag.setSubmitting(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (!isNumeric(rideId) || allRidesListData.length === 0) {
    return <Redirect to="/find-ride" />;
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
      {isloadingAllRidesList ? (
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
      ) : (
        <>
          <Container className="mt-4 mb-3">
            <Row>
              <Col xs={12}>
                <h1 className="display-4 font-title">
                  Ride #{ride.id}:{" "}
                  <span className="text-success">{ride.cityOrigin}</span> to{" "}
                  <span className="text-success">{ride.cityDestination}</span>
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
                <p className="text-warning mb-0">{ride.cityOrigin}</p>
                <p className="text-warning mb-0">{ride.provinceOrigin}</p>
              </Col>

              <Col xs={6} sm={3} lg={2} className="mb-3">
                <p className="mb-0">Destination:</p>
                <p className="mb-0">Province:</p>
              </Col>
              <Col xs={6} sm={3} lg={2} className="mb-3">
                <p className="text-success mb-0">{ride.cityDestination}</p>
                <p className="text-success mb-0">{ride.provinceDestination}</p>
              </Col>
              <Col lg={4}></Col>

              <Col xs={6} lg={4} className="mb-lg-3">
                <p className="mb-0">
                  Date: {dateFormat(ride.dateTime, "dd/mm/yyyy")}
                </p>
                <p className="mb-0">
                  Time: {dateFormat(ride.dateTime, "HH:MM TT")}
                </p>
              </Col>
              <Col xs={6} lg={4}>
                <p className="mb-0">
                  Driver:{" "}
                  <span className="text-success">{ride.User.username}</span>
                </p>
                <p className="mb-0">
                  Seats left:{" "}
                  <span className="text-success">{ride.seatsLeft}</span> /{" "}
                  {ride.seatsAvailable}
                </p>
              </Col>
              {!(ride.comment === "") ? (
                <Col xs={12} className="my-3 mt-lg-0">
                  <p className="mb-0">Comment:</p>
                  <i>"{ride.comment}"</i>
                </Col>
              ) : null}
              <Col xs={6} lg={4}>
                <p className="mb-0"></p>
              </Col>
            </Row>
          </Container>

          <hr className="w-75 mx-auto my-2" />

          <Container className="py-3">
            <Formik
              validationSchema={schema}
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
                          isValid={touched.seatsNeeded && !errors.seatsNeeded}
                          disabled={
                            isSubmitting || ride.User.UserId === currentUser.id
                          }
                        >
                          <option value="0" defaultValue="0">
                            Select an option
                          </option>
                          {optionsSeatsNeeded}
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
                            ride.User.UserId === currentUser.id
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

                  {message && (
                    <Alert variant={message.variant} className="mt-3">
                      {message.message}
                    </Alert>
                  )}

                  <Row>
                    <Col>
                      {ride.User.UserId === currentUser.id ? (
                        <p className="lead text-secondary text-center mt-3">
                          You can only view your own ride
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Container>
        </>
      )}
      {/* Display past booking for this ride by this user */}
      <Container>
        {isloadingUserRideBookingList ? (
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
        ) : userRideBookingData.length > 0 ? (
          <Container className="my-3">
            <hr className="w-75 mb-4 mx-auto" />

            <div className="d-inline-flex mb-3">
              <h3 className="me-2 mb-0">Previous booking for this ride</h3>
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
                  <span className="text-success">{booking.seatsBooked}</span>.
                  Your comment:{" "}
                  <i className="text-success">"{booking.commentPassenger}"</i>.
                  Status:{" "}
                  <span className="text-success">
                    {booking.BookingStatus.name}
                  </span>
                </Col>
              </Row>
            ))}
          </Container>
        ) : null}
      </Container>
    </div>
  );
}

export default Ride;
