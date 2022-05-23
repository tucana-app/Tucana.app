import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import {
  AlertIcon,
  CheckIcon,
  CommentIcon,
  XIcon,
} from "@primer/octicons-react";

import LoadingSpinner from "./LoadingSpinner";

import { submitFormDriverResponseBooking } from "../redux";

const FormDriverResponseBooking = ({ bookingId }) => {
  const { t } = useTranslation();
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

    dispatch(submitFormDriverResponseBooking(values, bookingData));

    formikBag.setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={bookingData.schema}
      validateOnChange={false}
      validateOnBlur={false}
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
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col className="mx-auto">
              <p className="lead mb-1">
                {t("translation:FormDriverResponseBooking.manageBooking")}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="py-2 mx-auto">
              {bookingData.seatsBooked > bookingData.Ride.seatsLeft ? (
                <p className="text-warning mb-0">
                  <AlertIcon size={24} className="me-2" />"
                  {bookingData.User.firstName}" booked {bookingData.seatsBooked}{" "}
                  seats but there are {bookingData.Ride.seatsLeft} seats left,
                  you cannot accept or refuse this booking.
                </p>
              ) : (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <p className="small text-secondary">
                        <AlertIcon size={24} className="me-2" />
                        Do not share any contact info (phone, email, links,
                        etc.), they will be shared within the platform before
                        the ride.
                      </p>
                      <CommentIcon size={24} className="text-success me-2" />
                      Comment{" "}
                      <span className="text-secondary">Not mandatory</span>
                    </Form.Label>
                    <Form.Control
                      name="comment"
                      as="textarea"
                      rows={2}
                      type="textarea"
                      placeholder="Give your passenger more details about the booking or the ride"
                      className="mb-1"
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
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <>
                      <Form.Group className="text-center">
                        <Button
                          variant="danger"
                          size="lg"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            bookingData.seatsBooked > bookingData.Ride.seatsLeft
                          }
                          onClick={() => setNewStatus(4)}
                          className="me-2"
                        >
                          <span>
                            <XIcon size={24} className="me-2" />
                            Refuse
                          </span>
                        </Button>

                        <Button
                          variant="success"
                          size="lg"
                          type="submit"
                          disabled={
                            isSubmitting ||
                            bookingData.seatsBooked > bookingData.Ride.seatsLeft
                          }
                          onClick={() => setNewStatus(3)}
                        >
                          <span>
                            <CheckIcon size={24} className="me-2" />
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
