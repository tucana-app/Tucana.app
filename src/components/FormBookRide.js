import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { AlertIcon } from "@primer/octicons-react";

import LoadingSpinner from "./LoadingSpinner";

import { submitFormBookRide } from "../redux";

const FormBookRide = () => {
  const { t } = useTranslation();
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
              <AlertIcon size={24} className="me-2" />
              {t("translation:formBookRide.alreadyRide")}
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
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col className="py-2 mx-auto">
                    <Form.Group className="mx-auto mb-3">
                      <Form.Label>
                        <span className="d-xs-screen">
                          {t("translation:global.passengers")}
                        </span>
                        <span className="d-md-screen">
                          {t("translation:formBookRide.numberPassengers")}
                        </span>
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
                        <option value="0">
                          {t("translation:global.selectOption")}
                        </option>
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
                        {t("translation:formBookRide.book")}
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
