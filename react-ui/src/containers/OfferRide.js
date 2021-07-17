import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faComment,
  faCarAlt,
  faExclamationTriangle,
  faMapMarker,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import dateFormat from "dateformat";

import { submitFormOfferRide } from "../redux";

const OfferRide = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { provinces } = useSelector((state) => state.global);
  const {
    isLoadingSubmitFormOfferRide,
    submitFormOfferRideSuccess,
    submitFormOfferRideFail,
  } = useSelector((state) => state.ride);

  const [alertFormSubmission, setAlertFormSubmission] = useState("");

  const form = useRef();

  const labelStringField = "You must enter a string";
  const labelRequiredField = "This field is required";

  const schema = Yup.object().shape({
    cityOrigin: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .required(labelRequiredField),
    provinceOrigin: Yup.mixed()
      .oneOf(provinces, "Must be a Costa Rican province")
      .required(labelRequiredField),
    cityDestination: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .required(labelRequiredField),
    provinceDestination: Yup.mixed()
      .oneOf(provinces, "Must be a Costa Rican province")
      .required(labelRequiredField),
    date: Yup.date()
      .min(
        dateFormat(new Date(), "yyyy-mm-dd"),
        "The date must be today or in the future"
      )
      .required(labelRequiredField),
    time: Yup.string(labelStringField).required(labelRequiredField),
    seatsAvailable: Yup.number()
      .required(labelRequiredField)
      .min(1, "Min. 1 passenger required")
      .max(6, "Max. 6 passengers"),
    comment: Yup.string(labelStringField),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormOfferRide(currentUser.id, values));

    formikBag.setSubmitting(false);
  };

  useEffect(() => {
    if (submitFormOfferRideSuccess) {
      setAlertFormSubmission(
        <div>
          Your ride has been added with success.{" "}
          <Link to="/my-rides/driver" className="text-success">
            Check it now
          </Link>
        </div>
      );
      form.current.reset();
    } else if (submitFormOfferRideFail) {
      setAlertFormSubmission("A problem occured while adding your ride");
    }
  }, [submitFormOfferRideSuccess, submitFormOfferRideFail]);

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="py-0 my-5" data-aos="fade-left">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="text-success font-title">Offer a ride</h1>
          <p className="lead">Thank you for helping the community!</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} lg={8} xl={6} className="mx-auto">
          <p className="text-light">
            Please fill up the submit form. Visit{" "}
            <Link to="/coming-soon" className="text-success">
              this link
            </Link>{" "}
            for more info.
          </p>

          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              cityOrigin: "",
              provinceOrigin: "",
              cityDestination: "",
              provinceDestination: "",
              date: "",
              time: "",
              seatsAvailable: 1,
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
              <Form noValidate onSubmit={handleSubmit} ref={form}>
                <Row className="mb-4">
                  <Col xs={12} sm={6} className="mb-3 mb-md-0">
                    <p className="font-title text-center text-sm-start mb-1">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-success me-2"
                      />
                      Your origin
                    </p>
                    <div className="p-2 p-md-3 border rounded">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          City<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="cityOrigin"
                          placeholder="City"
                          className="rounded-0"
                          onChange={handleChange}
                          isInvalid={!!errors.cityOrigin}
                          isValid={touched.cityOrigin && !errors.cityOrigin}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cityOrigin}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>
                          Province
                          <small className="text-secondary ms-2">
                            If you know it or not
                          </small>
                        </Form.Label>

                        <Form.Select
                          name="provinceOrigin"
                          className="rounded-0"
                          onChange={handleChange}
                          isInvalid={!!errors.provinceOrigin}
                          isValid={
                            touched.provinceOrigin && !errors.provinceOrigin
                          }
                          required
                        >
                          <option disabled hidden>
                            Select a province
                          </option>
                          {provinces.map((province, index) => (
                            <option key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </Form.Select>

                        <Form.Control.Feedback type="invalid">
                          {errors.provinceOrigin}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </Col>

                  <Col xs={12} sm={6}>
                    <p className="font-title text-center text-sm-start mb-1">
                      <FontAwesomeIcon
                        icon={faMapMarker}
                        className="text-danger me-2"
                      />
                      Your destination
                    </p>
                    <div className="p-2 p-md-3 border rounded">
                      <Form.Group className="mb-3">
                        <Form.Label>
                          City<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="cityDestination"
                          placeholder="City"
                          className="rounded-0"
                          onChange={handleChange}
                          isInvalid={!!errors.cityDestination}
                          isValid={
                            touched.cityDestination && !errors.cityDestination
                          }
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cityDestination}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>
                          Province
                          <small className="text-secondary ms-2">
                            If you know it or not
                          </small>
                        </Form.Label>
                        <Form.Select
                          name="provinceDestination"
                          className="rounded-0"
                          onChange={handleChange}
                          isInvalid={!!errors.provinceDestination}
                          isValid={
                            touched.provinceDestination &&
                            !errors.provinceDestination
                          }
                          required
                        >
                          <option disabled hidden>
                            Select a province
                          </option>
                          {provinces.map((province, index) => (
                            <option key={index} value={province}>
                              {province}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.provinceDestination}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    sm={6}
                    md={4}
                    className="text-center text-sm-start mb-3 mb-md-0"
                  >
                    <Form.Label>
                      <FontAwesomeIcon
                        icon={faCalendarCheck}
                        className="text-success me-2"
                      />
                      Day of the ride<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      placeholder="Date"
                      className="rounded-0"
                      min={dateFormat(new Date(), "yyyy-mm-dd")}
                      onChange={handleChange}
                      isInvalid={!!errors.date}
                      isValid={touched.date && !errors.date}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    sm={6}
                    md={4}
                    className="text-center text-sm-start mb-3 mb-md-0"
                  >
                    <Form.Label>
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-success me-2"
                      />
                      Time of the ride<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      placeholder="Time"
                      className="rounded-0"
                      min="00:00"
                      max="23:59"
                      onChange={handleChange}
                      isInvalid={!!errors.time}
                      isValid={touched.time && !errors.time}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.time}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xs={12}
                    sm={6}
                    md={4}
                    className="text-center text-sm-start mb-3 mb-md-0"
                  >
                    <Form.Label>
                      <FontAwesomeIcon
                        icon={faCarAlt}
                        className="text-success me-2"
                      />
                      Seats available<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="seatsAvailable"
                      className="rounded-0"
                      defaultValue="1"
                      onChange={handleChange}
                      isInvalid={!!errors.seatsAvailable}
                      isValid={touched.seatsAvailable && !errors.seatsAvailable}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Form.Select>
                    <small className="text-secondary">1 - 6 seats</small>
                    <Form.Control.Feedback type="invalid">
                      {errors.seatsAvailable}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    xs={12}
                    className="text-center text-sm-start"
                  >
                    <Form.Label>
                      <p className="small text-secondary">
                        <FontAwesomeIcon
                          icon={faExclamationTriangle}
                          className="text-secondary me-2"
                        />
                        Do not share any contact info (phone, email, etc), they
                        will be shared within the platform when a booking is
                        made.
                      </p>
                      <FontAwesomeIcon
                        icon={faComment}
                        className="text-success me-2"
                      />
                      Comment
                    </Form.Label>
                    <Form.Control
                      name="comment"
                      as="textarea"
                      rows={2}
                      type="textarea"
                      placeholder="Add any relevant info, like the name of the city next to where you go or the route you'll take"
                      className="rounded-0 mb-1"
                      onChange={handleChange}
                      isInvalid={!!errors.comment}
                      isValid={touched.comment && !errors.comment}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comment}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {!!alertFormSubmission ? (
                  <Row>
                    <Col>
                      <Alert
                        variant={
                          submitFormOfferRideSuccess ? "success" : "danger"
                        }
                      >
                        {alertFormSubmission}
                      </Alert>
                    </Col>
                  </Row>
                ) : null}

                <Row>
                  <Col>
                    <Form.Group className="text-end">
                      <Button
                        variant="success"
                        size="lg"
                        className="rounded-0"
                        type="submit"
                        disabled={
                          isSubmitting ||
                          submitFormOfferRideSuccess ||
                          submitFormOfferRideFail
                        }
                      >
                        Submit
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default OfferRide;
