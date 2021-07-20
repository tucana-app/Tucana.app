import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarCheck,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import dateFormat from "dateformat";

import { validateStep1 } from "../redux";

import { Link, Redirect } from "react-router-dom";
import { Alert } from "bootstrap";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { feedback } = useSelector((state) => state.global);
  const { provinces, labelStringField, labelRequiredField } = useSelector(
    (state) => state.global
  );
  const { isLoadingSubmitFormOfferRide, submitFormOfferRideSuccess } =
    useSelector((state) => state.ride);

  const { isStep1validated } = useSelector((state) => state.signup);

  const form = useRef();

  // Handle redirection in case the user is already logged in
  // Or if the form has already be submitted successfully

  const schema = Yup.object().shape({
    cityOrigin: Yup.string(labelStringField)
      .min(4, "Min. 4 characters")
      .max(20, "Max. 20 characters")
      .required(labelRequiredField),

    // PROBLEM: checkBox sends "target.value" instead of "target.checked".
    // terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    terms: Yup.array()
      .length(1, labelRequiredField)
      .required(labelRequiredField),
  });

  const handleSubmit = (values, formikBag) => {
    // dispatch(submitFormOfferRide(currentUser.id, values, form));

    // form.current.reset();
    console.log(values);
    // formikBag.setSubmitting(false);
  };

  if (isLoggedIn) {
    return <Redirect to="/my-rides" />;
  }

  if (isStep1validated) {
    return <Redirect to="/signup/step-2" />;
  }

  return (
    <Container className="my-5" data-aos="fade-in" data-aos-duration="1000">
      <Row className="mb-3">
        <Col className="text-center">
          <h1 className="text-success">Sign Up</h1>
          <p className="lead text-light">
            You need to sign up to access our service
          </p>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={10} lg={8} className="mx-auto">
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              terms: "",
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
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label>
                        First name<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="First name"
                        className="rounded-0"
                        onChange={handleChange}
                        isInvalid={!!errors.firstname}
                        isValid={touched.firstname && !errors.firstname}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstname}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>
                        Last name<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="Last name"
                        className="rounded-0"
                        onChange={handleChange}
                        isInvalid={!!errors.lastname}
                        isValid={touched.lastname && !errors.lastname}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col xs={12} md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label>
                        Email address<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        className="rounded-0"
                        placeholder="Email"
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        isValid={touched.email && !errors.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>
                        Phone number<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phonenumber"
                        placeholder="Phone number"
                        className="rounded-0"
                        onChange={handleChange}
                        isInvalid={!!errors.phonenumber}
                        isValid={touched.phonenumber && !errors.phonenumber}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    id="validationFormik0"
                  />
                </Form.Group>

                {/*<Row className="my-4">
                   <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      name="terms"
                      label="Agree to terms and conditions"
                      className="me-2"
                      feedback={errors.terms}
                      onChange={handleChange}
                      isInvalid={!!errors.terms}
                      isValid={touched.terms && !errors.terms}
                      required
                    />
                    {/* <Form.Check.Label>
                        Agree to{" "}
                        <Link to="/coming-soon" className="text-info">
                          terms and conditions
                        </Link>
                      </Form.Check.Label> 
                    </Form.Group> 
                    </Row> */}

                {feedback.message && (
                  <Alert variant={feedback.variant} className="mt-3">
                    {feedback.message}
                  </Alert>
                )}

                <Row>
                  <Col>
                    <Form.Group className="text-end">
                      <Button
                        variant="success"
                        size="lg"
                        className="rounded-0"
                        type="submit"
                        // disabled={
                        //   isSubmitting ||
                        //   isLoadingSubmitFormOfferRide ||
                        //   submitFormOfferRideSuccess
                        // }
                      >
                        {/* {isSubmitting || isLoadingSubmitFormOfferRide ? (
                        <Spinner
                          animation="border"
                          role="status"
                          as="span"
                          aria-hidden="true"
                          className="align-middle me-2"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                        ) : null}  */}
                        <Continue></Continue>
                        <FontAwesomeIcon
                          icon={faCar}
                          className="align-middle ms-2"
                        />
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

export default SignUp;
