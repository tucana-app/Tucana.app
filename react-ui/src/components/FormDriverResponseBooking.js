import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckCircle,
  faComment,
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { Form, Row, Col, Spinner, Button } from "react-bootstrap";

import { submitFormDriverResponseBooking } from "../redux";

const FormDriverResponseBooking = ({ bookingId }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { bookingData, isloadingSubmitFormDriverResponseBooking } = useSelector(
    (state) => state.ride
  );

  const [newStatus, setNewStatus] = useState(0);

  const handleSubmit = (values, formikBag) => {
    values = {
      ...values,
      userId: currentUser.id,
      bookingId: parseInt(bookingId),
      rideId: bookingData.RideId,
      newStatus,
      newSeatsAvailable: bookingData.Ride.seatsLeft - bookingData.seatsBooked,
    };

    dispatch(submitFormDriverResponseBooking(currentUser, values, bookingData));

    formikBag.setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={bookingData.schema}
      onSubmit={handleSubmit}
      initialValues={{
        comment: "",
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
              <p className="lead mb-1">Manage this ride</p>
            </Col>
          </Row>
          <Row>
            <Col xs={8} sm={6} md={5} lg={4} className="border py-2 mx-auto">
              {bookingData.seatsBooked > bookingData.Ride.seatsLeft ? (
                <p className="text-warning mb-0">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="me-2"
                  />
                  "{bookingData.User.username}" booked {bookingData.seatsBooked}{" "}
                  seats but there are only {bookingData.Ride.seatsLeft} seats
                  left, you cannot accept or refuse this booking.
                </p>
              ) : (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <p className="small text-secondary">
                        <FontAwesomeIcon
                          icon={faExclamationTriangle}
                          className="me-2"
                        />
                        Do not share any contact info (phone, email, etc), they
                        will be shared within the platform when a booking is
                        made.
                      </p>
                      <FontAwesomeIcon
                        icon={faComment}
                        className="text-success me-2"
                      />
                      Comment{" "}
                      <span className="text-secondary">Not mandatory</span>
                    </Form.Label>
                    <Form.Control
                      name="comment"
                      as="textarea"
                      rows={2}
                      type="textarea"
                      placeholder="Give your passenger more details about the booking or the ride"
                      className="rounded-0 mb-1"
                      onChange={handleChange}
                      isInvalid={!!errors.comment}
                      isValid={touched.comment && !errors.comment}
                      disabled={
                        bookingData.seatsBooked > bookingData.Ride.seatsLeft
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comment}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {isSubmitting || isloadingSubmitFormDriverResponseBooking ? (
                    <div className="text-center">
                      <Spinner
                        animation="border"
                        role="status"
                        as="span"
                        aria-hidden="true"
                        className="text-center my-2"
                      >
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <>
                      <Form.Group className="text-center">
                        <Button
                          variant="danger"
                          size="lg"
                          className="rounded-0"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            bookingData.seatsBooked > bookingData.Ride.seatsLeft
                          }
                          onClick={() => setNewStatus(4)}
                        >
                          <span className="text-white">
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Refuse
                          </span>
                        </Button>

                        <Button
                          variant="success"
                          size="lg"
                          className="rounded-0"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            bookingData.seatsBooked > bookingData.Ride.seatsLeft
                          }
                          onClick={() => setNewStatus(3)}
                        >
                          <span className="text-white">
                            <FontAwesomeIcon icon={faCheck} className="me-2" />
                            Accept
                          </span>
                        </Button>
                      </Form.Group>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormDriverResponseBooking;
