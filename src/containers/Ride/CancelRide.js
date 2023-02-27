import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";

import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";

import { cancelRide } from "../../redux";

const CancelRide = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();
  const dispatch = useDispatch();

  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingCancelRide, cancelRideSuccess } = useSelector(
    (state) => state.ride
  );
  const { labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );

  const schema = Yup.object().shape({
    reason: Yup.string(labelStringField)
      .required(labelRequiredField)
      .min(10, t("translation:global.errors.min10characters")),
  });

  const handleSubmit = (value, formikBag) => {
    dispatch(cancelRide(currentUser.Driver.id, rideId, value.reason));
    formikBag.setSubmitting(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (cancelRideSuccess.flag === "SUCCESS") {
    return <Redirect to={`/ride/${rideId}`} />;
  }

  return (
    <div data-aos="fade-in">
      <GoBack />

      <Container>
        <Row className="mb-3">
          <Col>
            <h1 className="title text-center">
              {t("translation:ride.cancelRide")}
            </h1>
          </Col>
        </Row>

        <Row>
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
