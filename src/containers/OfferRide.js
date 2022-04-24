import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import dateFormat from "dateformat";
import { AlertIcon } from "@primer/octicons-react";
import { Formik } from "formik";
import * as Yup from "yup";

import { submitFormOfferRide } from "../redux";
import FeedbackMessage from "../components/FeedbackMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const OfferRide = () => {
  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { provinces, labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );
  const { isLoadingSubmitFormOfferRide, submitFormOfferRideSuccess } =
    useSelector((state) => state.ride);

  const form = useRef();

  const schema = Yup.object().shape({
    cityOrigin: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(/^[a-zA-Z0-9\u00C0-\u00FF ]*$/, "Only letters & numbers allowed")
      .required(labelRequiredField),
    provinceOrigin: Yup.mixed()
      .oneOf(provinces, "Must be a Costa Rican province")
      .required(labelRequiredField),
    cityDestination: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .matches(/^[a-zA-Z0-9\u00C0-\u00FF ]*$/, "Only letters & numbers allowed")
      .required(labelRequiredField),
    provinceDestination: Yup.mixed()
      .oneOf(provinces, "Must be a Costa Rican province")
      .required(labelRequiredField),
    date: Yup.date()
      // if the date selected is not past 00:00:01
      // (midnight and 1 second) from today
      .min(new Date(), "The date must be in the future")
      .required(labelRequiredField),
    time: Yup.string(labelStringField).required(labelRequiredField),
    seatsAvailable: Yup.number()
      .required(labelRequiredField)
      .min(1, "Min. 1 passenger required")
      .max(6, "Max. 6 passengers"),
    comment: Yup.string(labelStringField),
  });

  const handleSubmit = (values, formikBag) => {
    dispatch(submitFormOfferRide(currentUser, values));

    form.current.reset();
    formikBag.setSubmitting(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="py-0 my-5" data-aos="fade-in">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="text-success font-title">Offer a ride</h1>
          <p className="lead mb-0">Thank you for helping the community!</p>
          <p className="text-center">
            Visit{" "}
            <Link to="/coming-soon" className="text-success">
              this link
            </Link>{" "}
            for more info.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={10} lg={8} xl={6} className="mx-auto">
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            validateOnBlur={false}
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
                      Origin
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
                          onChange={handleChange}
                          isInvalid={!!errors.provinceOrigin}
                          isValid={
                            touched.provinceOrigin && !errors.provinceOrigin
                          }
                          required
                        >
                          <option>Select a province</option>
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
                      Destination
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
                          onChange={handleChange}
                          isInvalid={!!errors.provinceDestination}
                          isValid={
                            touched.provinceDestination &&
                            !errors.provinceDestination
                          }
                          required
                        >
                          <option>Select a province</option>
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
                      Day of the ride<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      placeholder="Date"
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
                      Time of the ride<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      placeholder="Time"
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
                      Seats available<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="seatsAvailable"
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
                        <AlertIcon size={24} className="me-2" />
                        Do not share any contact info (phone, email, etc), they
                        will be shared within the platform when a booking is
                        made.
                      </p>
                      Comment
                    </Form.Label>
                    <Form.Control
                      name="comment"
                      as="textarea"
                      rows={2}
                      type="textarea"
                      placeholder="Want to share the road you'll take or a precision on your destination?"
                      className="mb-1"
                      onChange={handleChange}
                      isInvalid={!!errors.comment}
                      isValid={touched.comment && !errors.comment}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.comment}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Col className="mx-auto">
                    <FeedbackMessage />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="text-end">
                      <Button
                        variant="success"
                        size="lg"
                        type="submit"
                        disabled={
                          isSubmitting ||
                          isLoadingSubmitFormOfferRide ||
                          submitFormOfferRideSuccess
                        }
                      >
                        {isSubmitting || isLoadingSubmitFormOfferRide ? (
                          <LoadingSpinner />
                        ) : null}
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
