import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";

import { submitFormBookRide } from "../redux";
import LoadingSpinner from "./LoadingSpinner";

const FormBookRide = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const {
    isloadingBookingRide,
    rideData,
    userRideBookingData,
    isloadingUserRideBookingList,
  } = useSelector((state) => state.ride);

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormBookRide(currentUser, rideData.ride, values));

    formikBag.setSubmitting(false);
  };

  return (
    <>
      {!isloadingUserRideBookingList && userRideBookingData.length > 0 ? (
        <Row>
          <Col className="mx-auto">
            <p className="small text-warning mb-0">
              <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
              You already have booking(s) for this ride
            </p>
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col>
          <Formik
            validationSchema={rideData.schema}
            validateOnChange={false}
            validateOnBlur={false}
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
                  <Col className="py-2 mx-auto">
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
                        onChange={handleChange}
                        isInvalid={!!errors.seatsNeeded}
                        isValid={touched.seatsNeeded && !errors.seatsNeeded}
                        disabled={
                          isSubmitting ||
                          rideData.ride.DriverId === currentUser.id
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
                      <Button
                        variant="success"
                        size="lg"
                        type="submit"
                        disabled={
                          isSubmitting ||
                          isloadingBookingRide ||
                          rideData.ride.DriverId === currentUser.id
                        }
                      >
                        {isSubmitting || isloadingBookingRide ? (
                          <LoadingSpinner />
                        ) : null}
                        Book
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default FormBookRide;
