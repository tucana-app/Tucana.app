import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { getRide, getDriverBookingsRide, cancelRide } from "../../redux";
import { isEmptyObject } from "../../helpers";

const CancelRide = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();
  const dispatch = useDispatch();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const {
    isLoadingRide,
    rideData,
    isloadingDriverRideBookings,
    driverRideBookingsData,
    isLoadingCancelRide,
    cancelRideSuccess,
  } = useSelector((state) => state.ride);
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const [isFoundAcceptedBooking, setIsFoundAcceptedBooking] = useState(false);

  const schema = Yup.object().shape({
    reason: Yup.string(labelStringField)
      .required(labelRequiredField)
      .min(10, t("translation:global.errors.min10characters")),
  });

  const handleSubmit = (value, formikBag) => {
    dispatch(cancelRide(currentUser.Driver.id, rideId, value.reason));
    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    if (isEmptyObject(rideData)) {
      dispatch(getRide(rideId));
    }

    dispatch(getDriverBookingsRide(currentUser.Driver.id, rideId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rideData]);

  useEffect(() => {
    if (driverRideBookingsData.length) {
      driverRideBookingsData.map((booking) => {
        if (booking.BookingStatusId === 3) {
          setIsFoundAcceptedBooking(true);
        }
        return false;
      });
    }
  }, [driverRideBookingsData]);

  if (
    !isLoggedIn ||
    (rideData.ride &&
      currentUser.Driver &&
      currentUser.Driver.id !== rideData.ride.Driver.id)
  ) {
    return <Redirect to="/" />;
  }

  if (cancelRideSuccess.flag === "SUCCESS") {
    return <Redirect to={`/ride/${rideId}`} />;
  }

  return isLoadingRide || isloadingDriverRideBookings ? (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <LoadingSpinner />
        </Col>
      </Row>
    </Container>
  ) : (
    <div data-aos="fade-in">
      <GoBack />

      <Container className="mb-5">
        <Row className="mb-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <h1 className="title text-center">
              {t("translation:ride.cancelRide")}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <p>
              <Trans i18nKey={"translation:cancelRide.cancelPolicy"}>
                Make sure you review our{" "}
                <Link
                  to="/cancellation-policy"
                  className="fw-bold link-success"
                >
                  cancellation policy
                </Link>{" "}
                before canceling
              </Trans>
            </p>
          </Col>
        </Row>

        {isFoundAcceptedBooking ? (
          !isloadingDriverRideBookings && driverRideBookingsData.length > 0 ? (
            <Row>
              <Col
                xs={12}
                sm={10}
                md={8}
                lg={6}
                xl={4}
                className="container-box border-warning px-3 py-3 mb-3"
              >
                <p>{t("translation:cancelRide.existingBookings")}</p>
                <p className="text-secondary mb-0">
                  {t("translation:global.existedAcceptedBookings")}:
                </p>
                <ul className="mb-0">
                  {driverRideBookingsData.map((booking, index) =>
                    booking.BookingStatus.id === 3 ? (
                      <li key={index}>
                        <strong>{booking.User.firstName}</strong>{" "}
                        {t("translation:booking.summary2")}{" "}
                        <span className="fw-bold">{booking.seatsBooked}</span>{" "}
                        <span className="text-lowercase">
                          {t("translation:global.seat")}
                        </span>
                        {booking.seatsBooked > 1 ? "s" : null}
                      </li>
                    ) : null
                  )}
                </ul>
              </Col>
            </Row>
          ) : null
        ) : null}

        <Row className="mt-3">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
            <Formik
              validationSchema={schema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{
                reason: "",
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
                  <Form.Group>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={3}
                      name="reason"
                      value={values.reason}
                      placeholder={t("translation:ride.reasonCancel")}
                      onChange={handleChange}
                      isInvalid={!!errors.reason}
                      isValid={touched.reason && !errors.reason}
                      className="rounded"
                      disabled={
                        isSubmitting ||
                        isLoadingCancelRide ||
                        cancelRideSuccess.flag === "SUCCESS"
                      }
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.reason}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="text-end mt-5 mb-3">
                    <Button
                      variant="danger"
                      type="submit"
                      size="lg"
                      disabled={
                        isSubmitting ||
                        isLoadingCancelRide ||
                        cancelRideSuccess.flag === "SUCCESS" ||
                        values.reason.length < 10
                      }
                      className="py-2 w-100"
                    >
                      {isSubmitting || isLoadingCancelRide ? (
                        <span className="me-2">
                          <LoadingSpinner />
                        </span>
                      ) : null}
                      {t("translation:ride.cancelRide")}
                    </Button>
                  </Form.Group>

                  <Link to={`/ride/${rideId}`}>
                    <Button
                      variant="outline-success"
                      size="lg"
                      className="w-100"
                    >
                      {t("translation:global.goBack")}
                    </Button>
                  </Link>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CancelRide;
