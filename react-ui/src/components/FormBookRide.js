import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { Form, Row, Col, Spinner, Button } from "react-bootstrap";

import { submitFormBookRide } from "../redux";
import LoadingMessage from "./LoadingMessage";

const FormBookRide = ({ rideId }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const {
    isloadingBookingRide,
    rideData,
    userRideBookingData,
    isloadingUserRideBookingList,
  } = useSelector((state) => state.ride);

  const handleSubmit = (values, formikBag) => {
    dispatch(
      submitFormBookRide(currentUser.id, rideId, rideData.ride.DriverId, values)
    );

    formikBag.setSubmitting(false);
  };

  return (
    <>
      {isloadingUserRideBookingList ? (
        <Row>
          <Col className="text-center">
            <LoadingMessage />
          </Col>
        </Row>
      ) : userRideBookingData.length > 0 ? (
        <Row>
          <Col xs={8} className="mx-auto">
            <p className="text-warning">
              <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
              You already have booking(s) for this ride. You don't have to book
              another one to notify the driver, but you can make another booking
              if you need to add more people
            </p>
          </Col>
        </Row>
      ) : null}

      <Formik
        validationSchema={rideData.schema}
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
              <Col xs={8} sm={6} md={5} lg={4} className="border py-2 mx-auto">
                <Form.Group className="mx-auto mb-3">
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faCarAlt}
                      className="text-success me-2"
                    />
                    <span className="d-xs-screen">Passengers</span>
                    <span className="d-md-screen">Number of passenger</span>
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="seatsNeeded"
                    className="rounded-0"
                    onChange={handleChange}
                    isInvalid={!!errors.seatsNeeded}
                    isValid={touched.seatsNeeded && !errors.seatsNeeded}
                    disabled={
                      isSubmitting || rideData.ride.DriverId === currentUser.id
                    }
                  >
                    <option value="0">Select an option</option>
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
                    className="rounded-0 text-uppercase fw-bold"
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
                    Book
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormBookRide;
